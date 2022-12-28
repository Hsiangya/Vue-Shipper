<template>
  <el-container>
    <el-header height="72px" style="border-bottom: 1px solid #f5f5f5;">
      <div class="header">
        <div class="logo">
          <img src="./assets/logo.png" alt="">
        </div>
        <div class="top-menu">
          <router-link :to="{name:'Login'}">
            <el-button >登录</el-button>
          </router-link>
          <router-link :to="{name:'Register'}">
            <el-button >注册</el-button>
          </router-link>
        </div>
      </div>
    </el-header>
    <router-view/>

  </el-container>


</template>

<style scoped>
body {
  margin: 0;
}

img {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
  height: 72px;
  background-color: #a0cfff;
}

.header .logo {
  height: 48px;
}

.header .top-menu a {
  padding: 0 5px;
  text-decoration: none;
}


</style>
