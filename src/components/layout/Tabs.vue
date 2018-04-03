<template>
  <div class="tabs-box">
    <template v-if="!noTab">
      <el-button type="text" class="fl" @click="closeAll">全部关闭</el-button>
      <el-dropdown class="fr" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <!-- 下拉菜单 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item.command" v-for="item,index in tabBtns" :key="index">{{ item.text }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tabs type="card" v-model="curTab" @tab-remove="closeTab" @tab-click="switchTab">
        <el-tab-pane :label="item.label" :name="item.name" v-for="item,index in tabs" :key="index" :closable="index !== 0">
        </el-tab-pane>
      </el-tabs>
    </template>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  let initTab = { name: '/main', label: '新手引导' }

  export default {
    name: 'v-tabs',
    data () {
      let noTab = !!this.$route.meta.noTab
      let curTab = this.$storage.get('curTab') || initTab.name
      let tabs = this.$storage.get('tabs') || [initTab]
      return {
        noTab,
        tabBtns: [
          { text: '关闭当前', command: 'current' },
          { text: '关闭其他', command: 'others' },
          { text: '关闭所有', command: 'all' }
        ],
        curTab,
        tabs
      }
    },
    watch: {
      '$route' (to) {
        // 更新 noTab 属性
        this.noTab = !!to.meta.noTab
        this.checkTab(to)
      },
      curTab (val) {
        this.$router.push(val)
      }
    },
    created () {
      this.checkTab(this.$route)
    },
    methods: {
      checkTab ({meta, path, params}) {
        if (meta.label !== undefined) {
          if (params.id) {
            this.$storage.set('newTab', path)
          }
          if (this.findTab(path) === -1) {
            this.tabs.push({
              name: path,
              label: meta.label
            })
            // 重复组件再次打开刷新页面数据
            // this.$storage.set('newTab', path)
          }
          this.curTab = path
          this.$storage.set('curTab', this.curTab)
          this.$storage.set('tabs', this.tabs)
        }
      },
      // 根据 key 获取 tabs 中的位置
      findTab (key) {
        for (let i = 0, l = this.tabs.length; i < l; i++) {
          if (this.tabs[i].name === key) return i
        }
        return -1
      },
      // 切换tab
      switchTab (tab) {
        // 避免切换重复组件刷新页面数据
        this.$storage.set('newTab', '')
        this.curTab = tab.name
      },
      // 关闭当前tab、关闭任意一个已打开的tab
      closeTab (tab = this.curTab) {
        let index = this.findTab(tab)
        // // 第一个 tab 禁止关闭
        if (index > 0) {
          this.tabs.splice(index, 1)
          // 关闭当前tab
          if (this.curTab === tab) {
            // splice删除一个tab后, index就是下一个的tab位置
            // 如果splice删除最后一个tab, index应该为上一个tab
            this.curTab = (this.tabs[index] || this.tabs[index - 1])['name']
          } else {
            this.$storage.set('tabs', this.tabs)
          }
        }
      },
      // 关闭其他tab
      closeOthers () {
        let index = this.findTab(this.curTab)
        let tmpTab = this.tabs[index]['name']
        // 如果当前tab为第一个,则初始化initTab即可
        this.tabs = index > 0 ? [initTab, this.tabs[index]] : [initTab]
        this.curTab = tmpTab
        this.$storage.set('tabs', this.tabs)
      },
      // 关闭所有tab
      closeAll () {
        this.tabs = [initTab]
        this.curTab = initTab.name
      },
      // tab 指令
      handleCommand (command) {
        switch (command) {
          case 'current':
            this.closeTab()
            break
          case 'others':
            this.closeOthers()
            break
          case 'all':
            this.closeAll()
            break
        }
      }
    }
  }
</script>

<style lang="less">
  .tabs-box {
    & > .el-button {
      margin-top: 4px;
      padding-bottom: 8px;
    }
    .el-dropdown {
      margin-top: 14px;
      cursor: pointer;
    }
    .el-tabs--card {
      margin-left: 76px;
      margin-right: 36px;
    }
    .el-tabs__header {
      margin-bottom: 0;
      border-bottom: 1px solid #e5d4d1;
      .el-tabs__nav {
        border: 0;
      }
      .el-tabs__item {
        border-left: 0;
        box-sizing: border-box;
        &.is-active {
          bottom: -1px;
          border: 1px solid #e5d4d1;
          border-bottom-color: #fff;
          border-radius: 4px 4px 0 0;
          background: #fff;
        }
        .el-icon-close {
          font-size: 14px;
        }
      }
    }
  }
</style>
