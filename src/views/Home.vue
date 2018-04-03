<template>
  <el-container class="wrapper-box" direction="vertical">
    <v-header />
    <el-container>
      <v-sidebar />
      <el-main>
        <transition name="move" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import VHeader from '@/components/layout/Header'
import VSidebar from '@/components/layout/Sidebar'

export default {
  name: 'home',
  components: {
    VHeader,
    VSidebar
  }
}
</script>
