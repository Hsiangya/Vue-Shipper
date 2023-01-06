<template>
  <el-container>
    <el-header height="72px" style="border-bottom: 1px solid #f5f5f5;">
      <div class="header">
        <div class="logo">
          <router-link :to="{name:'Basic'}">
            <img src="./assets/logo.png" alt="">
          </router-link>
        </div>
        <div v-if="name" @click="logout" class="top-menu">{{ name }}</div>
        <div v-else class="top-menu">
          <router-link :to="{name:'Login'}">
            <el-button>登录</el-button>
          </router-link>
          <router-link :to="{name:'Register'}">
            <el-button>注册</el-button>
          </router-link>
        </div>
      </div>
    </el-header>
    <router-view/>
  </el-container>
</template>
<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {useRouter} from "vue-router"

const store = useStore();
const router = useRouter();
const name = computed(() => store.state.name);

function logout() {
  //localStorage清空 + state值清空 + 跳转登录
  store.commit("logout");
  // 回到登录界面
  router.push({name: "Login"});
}
</script>
<style>
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
