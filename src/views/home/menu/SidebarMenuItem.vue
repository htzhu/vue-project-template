<template>
  <div>
    <template v-for="item in routes">
      <router-link v-if="item.children.length === 0" :to="item.path" :key="item.path">
        <el-menu-item :key="item.path" :index="item.path">
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
        <template v-for="child in item.children">
          <sidebar-menu-item :routes="[child]" :key="item.path + child.path"></sidebar-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SidebarMenuItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  components: {}
};
</script>
<style stoped></style>
