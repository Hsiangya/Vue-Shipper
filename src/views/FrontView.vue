<template>
  <div class="main">
    <el-container style="height: 100%">
      <el-aside width="300px">
        <el-scrollbar>
          <el-menu default-active="2" :router="true">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Location/>
                </el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="2" :route="{name:'Basic'}">
              <el-icon>
                <IconMenu/>
              </el-icon>
              <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="3" :route="{name:'Auth'}">
              <el-icon>
                <Document/>
              </el-icon>
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">

              <el-icon>
                <Setting/>
              </el-icon>
              <span>Navigator Four</span>
            </el-menu-item>
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
import {
  Document, Menu as IconMenu, Location, Setting,
} from '@element-plus/icons-vue'
</script>

<style scoped>
.main {
  /*Viewport Height 相对视口高度*/
  height: calc(100vh - 72px) /* 动态计算 高度-导航窗高度 */

}

.body {
  background-color: #f5f5f5;
}
</style>