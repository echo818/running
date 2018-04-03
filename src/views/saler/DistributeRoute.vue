<template>
  <el-container>
    <el-aside v-show="!isCollapse"
      class="aside-padding-top"
      width="400px">
      <div class="search">
        切换路线
        <el-select v-model="route"
          @change="updateStoresInCurRoute"
          value-key="id">
          <el-option v-for="(item, index) in routeOpts"
            :key="index"
            :label="item.group_line_name"
            :value="{ id: item.group_line_id, name: item.group_line_name }">
          </el-option>
        </el-select>
      </div>
      <v-page-table
        :data="curRouteStores"
        :opts="tableOptions"
        :options="pageOptions"
        :events="events" />
    </el-aside>
    <button
      class="btn-icon-collapse"
      :class="isCollapse ? 'el-icon-d-arrow-right collapsed' : 'el-icon-d-arrow-left expanded'"
      @click="collapseHandler" />
    <el-main>
      <div class="search">
        区域
        <el-select v-model="areaId" @change="getStores" clearable>
          <el-option v-for="(item, index) in areaOpts"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        标签
        <el-select v-model="tagId" @change="getStores" clearable>
          <el-option v-for="(item, index) in tagOpts"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        业务员
        <el-select v-model="salerId" @change="getStores" clearable>
          <el-option v-for="(item, index) in salerOpts"
            :key="index"
            :label="item.contractor_name"
            :value="item.contractor_id">
          </el-option>
        </el-select>
        拜访时间
        <el-date-picker
          v-model="visitTimeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <el-button @click="getStores" type="primary" class="btn-icon-refresh">搜索</el-button>
      </div>
      <!--颜色标识说明-->
      <div>
        <span><img class="color-mark" :src="starRed">：当前路线下的超市（{{ oweToCurRoute.length }}）</span>
        <span><img class="color-mark" :src="starBlue">：未分配路线的超市（{{ notOweToAnyRoute.length }}）</span>
        <span><img class="color-mark" :src="starGray">：其他路线下的超市（{{ oweToOtherRoutes.length }}）</span>
      </div>
      <div>
        <span>当前路线：<span class="cur-route-name">{{ route.name }}</span></span>
        <span>当前框选的超市个数：<span class="cur-route-name">{{ selectedStoresNum }}</span></span>
        <span>当前框选的其他路线下的超市个数：<span class="cur-route-name">{{ selectedOtherStoresNum }}</span></span>
      </div>
      <div id="map" style="width: 100%;height: 700px;">
      </div>
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */
import BMap from 'BMap'
import BMapLib from 'BMapLib'
import SDM from '@/mixins/common/sharedDataMixin'
import page from '@/mixins/common/page.js'

let notOweToAnyRouteColor = '#4a90e2'   // 蓝色
let oweToCurRouteColor = '#d4372f'      // 红色
let oweToOtherRoutesColor = '#666'      // 灰色

export default {
  name: 'distributeRoute',
  mixins: [ SDM, page ],
  data () {
    return {
      // left
      isCollapse: false, // 是否折叠左侧
      routeOpts: [], // 路线下拉列表
      curRouteStores: [], // 超市列表
      // table配置
      events: {
        height: 700,
        currentChange: this.checkStoreInfo
      },
      tableOptions: {
        entity_id: {
          label: '超市ID'
        },
        store_name: {
          label: '超市名称'
        },
        tag_name: {
          label: '标签类型'
        },
        contractor: {
          label: '业务员'
        }
      },
      pageOptions: {
        layout: 'total, sizes, prev, next, jumper'
      },

      starRed: require('@/assets/images/star_red.png'),
      starBlue: require('@/assets/images/star_blue.png'),
      starGray: require('@/assets/images/star_gray.png'),

      // search
      areaId: '',
      areaOpts: [],
      tagId: '',
      tagOpts: [],
      salerId: '',
      salerOpts: [],
      visitTimeRange: [],

      // map
      map: null,
      drawingManager: null,
      marker: null,
      mapMenu: this.getMapMenu(),
      scale: new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }),
      
      stores: [], // 地图上的超市
      points: [], // stores 对应的坐标
      overlays: [], // 地图上的矩形覆盖物
      notOweToAnyRoute: [], // 未分配路线的超市
      oweToCurRoute: [], // 当前路线下的超市
      oweToOtherRoutes: [], // 其他路线下的超市

      selectedStoresNum: 0, // 框选的超市数量
      selectedOtherStoresNum: 0, // 框选的其他路线的超市数量

      city: {
        id: '',
        name: ''
      },
      route: {
        id: '',
        name: ''
      },
      sharedKeys: [
        'city', 'route'
      ]
    }
  },
  watch: {
    stores: function (val) {
      this.drawStores(val)
    }
  },
  methods: {
    // 折叠 / 展开左侧
    collapseHandler () {
      this.isCollapse = !this.isCollapse
    },

    // 地图右键菜单初始化
    getMapMenu () {
      let mapMenu = new BMap.ContextMenu()
      mapMenu.addItem(new BMap.MenuItem('添加', this.addToRoute))
      mapMenu.addItem(new BMap.MenuItem('移除', this.removeFromRoute))
      mapMenu.addItem(new BMap.MenuItem('取消', this.clearRecOverlays))
      return mapMenu
    },

    // 获取指定城市下的路线列表
    getRoutes () {
      let param = {
        city_id: this.city.id
      }
      this.$ajax('distributeRoute/routeList', param).then(res => {
        this.routeOpts = res.items || []
      })
    },
    // 获取超市
    getStores () {
      let param = {
        city_id: this.city.id,
        area_id: this.areaId,
        tag_id: this.tagId,
        contractor_id: this.salerId,
        visited_at: this.visitTimeRange
      }
      this.$ajax('distributeRoute/getStores', param).then(res => {
        this.stores = res.items
      })
    },
    // 获取区域列表
    getAreas () {
      let param = {
        city_id: this.city.id
      }
      this.$ajax('area/list', param).then(res => {
        this.areaOpts = res
      })
    },
    // 获取标签列表
    getTags () {
      this.$ajax('group/tagList').then(res => {
        this.tagOpts = res
      })
    },
    // 获取业务员列表
    getSalers () {
      let param = {
        city_id: this.city.id
      }
      this.$ajax('saler/list', param).then(res => {
        this.salerOpts = res
      })
    },
    // 获取当前路线下的超市列表
    updateStoresInCurRoute () {
      let param = {
        group_line_id: this.route.id,
        city_id: this.city.id,
        area_id: this.areaId,
        contractor_id: this.salerId,
        tag_id: this.tagId,
        visited_at: this.visitTimeRange,
        page_size: this.pageOptions.pageSize,
        page: this.pageOptions.currentPage
      }
      this.$ajax('distributeRoute/updateStores', param).then(res => {
        let { items, pagination } = res
        this.curRouteStores = items || []
        this.pageOptions.total = pagination ? pagination.total_count : 0
      })
    },

    // 在地图上画超市
    drawStores (stores) {
      // 先清除已画的覆盖物
      this.map.clearOverlays()
      // 超市转换成点
      let points = []
      stores.forEach(store => {
        let { lng, lat } = store
        if (lng && lat) {
          let point = new BMap.Point(lng, lat)
          point.info = {}
          point.info.entity_id = store.entity_id
          point.info.group_line_id = store.group_line_id
          point.info.store_name = store.store_name
          point.info.area_name = store.area_name
          point.info.contractor = store.contractor
          point.info.tag_name = store.tag_name
          point.info.order_info = store.order_info
          point.info.visit_info = store.visit_info
          points.push(point)
        }
      })
      this.points = points
      // 将点分成三组，每组用特定的颜色画
      this.groupPoints(points);
      [
        [this.notOweToAnyRoute, notOweToAnyRouteColor],
        [this.oweToCurRoute, oweToCurRouteColor],
        [this.oweToOtherRoutes, oweToOtherRoutesColor]
      ].forEach(arr => {
        this.drawMassivePoints(arr[0], arr[1])
      })
      // 使所有点都能出现在视野中
      // this.map.setViewport(points)
    },
    // 在地图上画指定颜色的点
    drawMassivePoints (points = [], color = notOweToAnyRouteColor) {
      // 点的样式
      let options = {
        size: BMAP_POINT_SIZE_BIGGER,
        shape: BMAP_POINT_SHAPE_STAR,
        color: color
      }
      // 地图上画点
      let pointCollection = new BMap.PointCollection(points, options)
      pointCollection.addEventListener('click', function (e) {
        let point = e.point
        let info = point.info
        let opts = {
          width: 150,
          height: 100,
          title: info.store_name
        }
        let content = info.area_name + '&nbsp;&nbsp;&nbsp;' + info.contractor + '<br />' +
          info.tag_name + '<br />' + info.order_info +  '<br />' + info.visit_info
        let infoWindow = new BMap.InfoWindow(content, opts)
        this.map.openInfoWindow(infoWindow, point)
      })
      this.map.addOverlay(pointCollection)
    },
    // 清除矩形覆盖物
    clearRecOverlays () {
      this.overlays.forEach(overlay => this.map.removeOverlay(overlay))
      this.overlays = []
      this.drawingManager.close()
    },

    // 获取在矩形框内的超市点
    getInlinePoints (overlays = []) {
      let inlinePoints = []
      this.points.forEach(point => {
        overlays.forEach(overlay => {
          let bounds = overlay.getBounds()
          if (BMapLib.GeoUtils.isPointInRect(point, bounds)) {
            inlinePoints.push(point)      
          }
        })
      })
      return inlinePoints
    },

    // 将选中的超市加入当前路线
    addToRoute () {
      let stores = this.getInlinePoints(this.overlays)
      let storeIds = []
      stores.forEach(store => storeIds.push(store.info.entity_id))
      let param = {
        city_id: this.city.id,
        group_line_id: this.route.id,
        customer_ids: storeIds
      }
      this.$ajax('distributeRoute/addToRoute', param).then(res => {
        // 更新左侧超市列表
        this.updateStoresInCurRoute()
        // 清除矩形覆盖物
        this.clearRecOverlays()
        // 更新超市
        this.getStores()
      })
    },
    // 将选中的超市移除当前路线
    removeFromRoute () {
      let stores = this.getInlinePoints(this.overlays)
      let storeIds = []
      stores.forEach(store => storeIds.push(store.info.entity_id))
      let param = {
        city_id: this.city.id,
        customer_ids: storeIds
      }
      this.$ajax('distributeRoute/removeFromRoute', param).then(res => {
        this.updateStoresInCurRoute()
        this.clearRecOverlays()
        this.getStores()
      })
    },

    getTableData () {
      this.updateStoresInCurRoute()
    },

    rectanglecomplete (overlay) {
      let bounds = overlay.getBounds()
      // 鼠标处于绘制模式的时候，鼠标左右键单击都会被当成绘制了一个矩形（此时的矩形西南角和东北角的坐标相同）
      // 所以需要判断是真的绘制了一个矩形还是因为鼠标左右键的误操作
      if (bounds.toSpan().lng !== 0 || bounds.toSpan().lat !== 0) {
        this.overlays.push(overlay)
        // 每次成功框选之后都会计算选中的超市数量 & 选中的其他路线下的超市数量
        let points = this.getInlinePoints(this.overlays)
        this.selectedStoresNum = points.length
        this.selectedOtherStoresNum = points.filter(point => point.info.group_line_id !== '0' && point.info.group_line_id !== this.route.id).length
      }
    },

    // 覆盖SDM中的afterSharedDataChange，当监听的数据（city, route）变化时调用
    afterSharedDataChange () {
      // 初始化地图,设置中心点坐标和地图级别
      this.map.centerAndZoom(this.city.name)
      // 获取各种数据
      this.getRoutes()
      this.getStores()
      this.getAreas()
      this.getTags()
      this.getSalers()
      this.updateStoresInCurRoute()
    },

    // 给点分组，分为三组：
    // 未被划入任何路线 group_line_id === '0'
    // 被划入当前路线 group_line_id === route.id
    // 被划入当前城市的其他路线 group_line_id !== route.id
    groupPoints (points = []) {
      this.notOweToAnyRoute = points.filter(point => point.info.group_line_id === '0')
      this.oweToCurRoute = points.filter(point => point.info.group_line_id === this.route.id)
      this.oweToOtherRoutes = points.filter(point => point.info.group_line_id !== '0' && point.info.group_line_id !== this.route.id)
    },

    // 查看超市在地图上的位置
    checkStoreInfo (row) {
      // 先清除该超市在地图上对应的marker
      this.map.removeOverlay(this.marker)
      // 重画超市在地图上的位置
      let { lng, lat } = row
      if (lng && lat) {
        this.map.panTo(new BMap.Point(lng, lat))
        this.marker = new BMap.Marker(new BMap.Point(lng, lat))
        this.map.addOverlay(this.marker)
      }
    }
  },
  mounted () {
    // 创建Map实例
    this.map = new BMap.Map('map')
    // 开启鼠标滚轮放大缩小地图的功能
    this.map.enableScrollWheelZoom()
    
    this.map.addEventListener("tilesloaded", () => {
      // 地图加载完毕之后添加【添加/移除】右键菜单
      this.map.addContextMenu(this.mapMenu)
      // 左上角，添加比例尺
      this.map.addControl(this.scale)
    })

    // 设置矩形框样式
    let styleOptions = {
      fillColor: '#000',
      strokeWeight: 1,
      strokeOpacity: 0.3,
      fillOpacity: 0.3
    }
    // 实例化鼠标绘制工具
    this.drawingManager = new BMapLib.DrawingManager(this.map, {
      isOpen: false,
      enableDrawingTool: true,
      drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMap.Size(5, 5),
        drawingModes: [
          BMAP_DRAWING_RECTANGLE
        ]
      },
      rectangleOptions: styleOptions
    })
    this.drawingManager.addEventListener('rectanglecomplete', this.rectanglecomplete)
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 5px;
  .el-select {
    width: 180px;
  }
  .el-button+.el-button {
    margin-left: 0;
  }
}
.btn-icon-collapse {
  width: 24px;
  height: 24px;
  padding: 0;
  font-size: 18px;
  color: #d4372f;
  border: 0;
  outline: 0;
  background: inherit;
  cursor: pointer;
}
.collapsed {
  position: fixed;
  top: 450px;
  left: 135px;
}
.expanded {
  position: fixed;
  top: 450px;
  left: 545px;
}
.aside-padding-top {
  padding-top: 20px;
}
.color-mark {
  width: 18px;
  height: 17px;
}
span+span {
  margin-left: 5px;
}
.cur-route-name {
  font-style: italic;
  font-weight: bold;
  color: red;
}
</style>


