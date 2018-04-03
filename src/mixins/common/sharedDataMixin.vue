<script>
/**
 * VUE mixins知识点
 * 混合对象(mixins)可以包含任意组件选项。当组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。
 * 当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合：
 * 1、同名钩子函数将混合为一个数组，因此都将被调用。混合对象的钩子将在组件自身钩子【之前】调用
 * 2、值为对象的选项，例如 data, methods, components 和 directives，将被混合为同一个对象。两个对象键名冲突时，
 *    取组件对象的键值对。
 */

/**
 * 如果要在inOutDetail.vue中使用，需要以下几步
 * 第一步：import SDM from 'xxx/sharedDataMixin'
 * 第二步：mixins: [SDM]
 * 第三步：data中定义需要缓存的数据
 * data () {
 *   details: [],
 *
 *   skuId: '',
 *   skuLsin: '',
 *   // sharedKeys中定义了需要缓存的数据，如：skuId、skuLsin，没有定义的无需缓存，如：details
 *   sharedKeys: ['skuId', 'skuLsin']
 * }
 * 第四步：在stock.vue中
 * this.$router.push({
 *   name: 'in-out-detail',
 *   params: {
 *     id: this.row.entity_id,
 *     sharedData: {
 *       skuId: this.row.entity_id,
 *       skuLsin: this.row.sku_lsin
 *     }
 * })
 */

 /**
  * sharedDataMixin 简称 SDM
  * inOutDetail.vue stock.vue
  * 假设inOutDetail.vue中引入了SDM，stock.vue可以创建一个inOutDetail页面
  * 场景：stock.vue页面有一些sku库存信息数据，可以点击每条数据的【进出明细button】查看该sku的进出明细inOutDetail.vue（/stock/in-out-detail/xxx）
  * 当从非inOutDetail.vue页（如：stock.vue）【创建】或【再次进入】inOutDetail.vue（/stock/in-out-detail/123 和 /stock/in-out-detail/456都属于inOutDetail.vue页）页面时，会触发beforeRouteEnter，并且【会】传递sharedData
  * 当从非inOutDetail.vue页（如：stock.vue）【切换】到inOutDetail.vue页面时，会触发beforeRouteEnter，并且【不会】传递sharedData
  * 当inOutDetail.vue之间互相切换时（/stock/in-out-detail/123 切换到 /stock/in-out-detail/456），会触发beforeRouteUpdate
  */
  export default {
    data () {
      return {
        fullPath: '',
        sharedKeys: [], // 会被引入SDM的组件中data定义的sharedKeys的值覆盖，见inOutDetail.vue
        sharedInit: {} // 保存需缓存数据的初始值。inOutDetail.vue中需缓存的数据是skuId、skuLsin等，所以sharedInit = { skuId: '', skuLsin: '' }，初始化过程在created中完成。
      }
    },
    computed: {
      // 用vm实例中sharedKeys指定的data属性填充sharedData对象
      sharedData () {
        let data = this.assignObjAttrs({}, this)
        return data
      }
    },
    watch: {
      sharedData: {
        handler: function (newVal, oldVal) {
          console.log('[SDC]:shared data has changed')
          this.afterSharedDataChange(newVal, oldVal)
        },
        deep: true
      }
    },
    methods: {
      afterSharedDataChange (newVal, oldVal) {
        // console.log('[SDC]:afterSharedDataChange')
      },
      // 用对象src中的属性值给对象obj的属性赋值
      assignObjAttrs (obj, src) {
        for (let key of this.sharedKeys) {
          if (src.hasOwnProperty(key)) {
            obj[key] = src[key]
          }
        }
        return obj
      },
      // 更新sharedData中各属性的值
      updateSharedData (src = this.sharedInit) {
        this.assignObjAttrs(this, src)
      }
    },
    created () {
      console.log('[SDC]:created')
      this.assignObjAttrs(this.sharedInit, this)
    },
    mounted () {
      console.log('[SDC]:mounted')
    },
    beforeRouteEnter (to, from, next) {
      console.log('[SDC]:beforeRouteEnter -> From[' + from.fullPath + '] To[' + to.fullPath + ']')
      next(vm => {
        console.log('[SDC]:beforeRouteEnter -> in next')

        let fullPath = vm.fullPath = to.fullPath
        let data = null        // 用于更新sharedData中属性的值
        if (to.params.sharedData) {
          // 存在：代表新建或再次打开一个tab页
          console.log('[SDC]:Load from params' + '-----' + '新建或再次打开一个[' + fullPath + ']tab页')
          // 更新storage中的sharedData
          vm.$storage.remove(fullPath)
          vm.$storage.set(fullPath, to.params.sharedData)

          // 制作新值
          data = vm.assignObjAttrs({}, to.params.sharedData)
        } else {
          // 不存在，目前项目中存在以下两种场景
          // 1、从非inOutDetail.vue页【切换】到了inOutDetail.vue页，此时从storage中取值
          // 2、从左侧菜单中打开了一个新tab，此时传递undefined（即用sharedInit去更新sharedData中属性的值）
          data = vm.$storage.get(fullPath) || undefined
        }
        vm.updateSharedData(data)
      })
    },
    beforeRouteUpdate (to, from, next) {
      console.log('[SDC]:beforeRouteUpdate. From[' + from.fullPath + '] To[' + to.fullPath + ']')
      // 更新storage中的sharedData
      this.fullPath = to.fullPath
      this.$storage.set(from.fullPath, this.sharedData)
      // data用于更新sharedData中属性的值
      let data = this.$storage.get(to.fullPath) || undefined
      this.updateSharedData(data)
      next()
    },
    beforeRouteLeave (to, from, next) {
      console.log('[SDC]:beforeRouteLeave. From[' + from.fullPath + '] To[' + to.fullPath + ']')
      this.$storage.set(from.fullPath, this.sharedData)
      next()
    }
  }
</script>
