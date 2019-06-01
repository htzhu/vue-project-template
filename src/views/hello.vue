<template>
  <div style="width: 300px;">
    <el-menu
      class="el-menu"
      :default-active="defaultActiveMenu"
      :collapse="isCollapse"
      background-color="#323743"
      text-color="#fff"
      active-text-color="#02c1de"
    >
      <span :class="defaultIconFoldClass" class="foldSpanClass" @click="foldClick"></span>

      <div>
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">导航一</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航二</span>
          </template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {
      isCollapse: false,
      defaultIconFoldClass: 'el-icon-s-fold'
    };
  },
  methods: {
    // 侧边栏菜单展开、收缩按钮
    foldClick() {
      this.isCollapse = !this.isCollapse;
      if (this.defaultIconFoldClass === 'el-icon-s-unfold') {
        this.defaultIconFoldClass = 'el-icon-s-fold';
      } else {
        this.defaultIconFoldClass = 'el-icon-s-unfold';
      }
    }
  }
};
</script>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 260px;
  min-height: 400px;
}
.foldSpanClass {
  font-size: 20px;
  height: 45px;
  line-height: 50px;
  cursor: pointer;
  width: 100%;
  color: #fff;
  text-align: center;
  /* border-bottom: 2px solid #9ea7b4;
  border-top: 2px solid #9ea7b4; */
}
@import url('../assets/css/home/sidebar-menu.css');
</style>
