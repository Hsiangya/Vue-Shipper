<template>
  <div class="main">
    <el-container style="height: 100%">
      <el-aside width="300px">
        <el-scrollbar>
          <el-menu :default-active="activeRouter" :router="true">
            <el-menu-item @click='PrintRoute' index='Home' :route="{name:'Home'} ">
              <el-icon>
                <Menu/>
              </el-icon>
              <span>首 页</span>
            </el-menu-item>
            <el-sub-menu index="User">
              <template #title>
                <el-icon>
                  <User/>
                </el-icon>
                <span>会员中心</span>
              </template>
              <el-menu-item index="Basic" :route="{name:'Basic'}">基本信息</el-menu-item>
              <el-menu-item index="Auth" :route="{name:'Auth'}">账号认证</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="Ship">
              <template #title>
                <el-icon>
                  <Box/>
                </el-icon>
                <span>运单中心</span>
              </template>
              <el-menu-item index="ShipPublish" :route="{name:'ShipPublish'}">发布运单</el-menu-item>
              <el-menu-item index="ShipAdmin" :route="{name:'ShipAdmin'}">运单管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="body">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {Box, Menu, User} from '@element-plus/icons-vue'
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
// 将菜单激活状态===当前路由名称
const activeRouter = computed(() => route.name)

function PrintRoute() {
  console.log(route)
}

</script>

<style scoped>
.main {
  /*Viewport Height 相对视口高度*/
  height: calc(100vh - 72px) /* 动态计算 高度-导航窗高度 */

}

.el-menu {
  border-right: 0;
}


.body {
  background-color: #f5f5f5;
}
</style>