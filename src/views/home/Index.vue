<template>
  <el-container class="home-container">
    <el-header>
      <el-row class="home-header-row">
        <el-col class="home-header-col" :span="3">
          <span class="iconfont project-iconfont">&#xe6d2;</span><span class="project-name">实时计算</span>
        </el-col>
        <el-col :span="21">
          <el-row></el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏菜单 -->
      <sidebar-menu></sidebar-menu>
      <el-main>
        <router-view />
        <!-- <component :is="isComponent"></component> -->
        <!-- <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-row> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SidebarMenu from './Menu/SidebarMenu.vue';
export default {
  name: 'Home',
  components: {
    SidebarMenu
  },
  data() {
    return {
      isCollapse: false,
      defaultIconFoldClass: 'el-icon-s-fold',
      isComponent: null
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../../assets/css/home/index.css');
</style>
