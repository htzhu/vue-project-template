<template>
  <el-menu
    class="el-menu"
    :default-active="defaultActiveMenu"
    :collapse="isCollapse"
    background-color="#323743"
    text-color="#fff"
    active-text-color="#02c1de"
  >
    <span :class="defaultIconFoldClass" class="foldSpanClass" @click="foldClick"></span>

    <!-- <sidebar-menu-item :routes="this.sidebarMenus"></sidebar-menu-item> -->

    <template v-for="item in sidebarMenus">
      <router-link v-if="item.children.length === 0" :to="item.path" :key="item.path">
        <el-menu-item v-if="item.children.length === 0" :key="item.path" :index="item.path">
          <i class="iconfont" v-if="item.iconFlag" :class="item.iconFlag"></i>
          <i class="iconfont iconcaidan" v-else></i>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.path" :key="item.path">
        <template slot="title">
          <i class="iconfont" v-if="item.iconFlag" :class="item.iconFlag"></i>
          <i class="iconfont iconcaidan" v-else></i>
          <span>{{ item.name }}</span>
        </template>
        <router-link v-for="child in item.children" :to="child.path" :key="child.path">
          <el-menu-item :key="child.path" :index="child.path">
            <i class="iconfont" v-if="child.iconFlag" :class="child.iconFlag"></i>
            <i class="iconfont iconcaidan" v-else></i>
            <span>{{ child.name }}</span>
          </el-menu-item>
        </router-link>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
// import SidebarMenuItem from './SidebarMenuItem.vue';
export default {
  name: 'SidebarMenu',
  data() {
    return {
      isCollapse: false,
      defaultIconFoldClass: 'el-icon-s-fold',
      defaultActiveMenu: '',
      routes: []
    };
  },
  components: {
    // SidebarMenuItem
  },
  computed: {
    sidebarMenus() {
      return this.$store.state.sidebarMenus;
    },
    currentRouterView() {
      return this.$store.state.currentRouterView;
    }
  },
  mounted() {
    // 若当前路由不为空，默认选中当前路由，否则选中第一个
    if (this.currentRouterView) {
      this.defaultActiveMenu = this.currentRouterView.path;
    } else {
      // 默认选中第一个菜单或第一个目录下的第一个子菜单
      if (this.sidebarMenus && this.sidebarMenus.length > 0) {
        if (this.sidebarMenus[0].children.length === 0) {
          this.defaultActiveMenu = this.sidebarMenus[0].path;
        } else {
          this.defaultActiveMenu = this.sidebarMenus[0].children[0].path;
        }
      }
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../../../assets/css/home/sidebar-menu.css');
</style>
