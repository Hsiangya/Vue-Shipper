<template>
  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header" style="display: flex;justify-content: space-between;align-items: center">
        <div>
          <span style="font-weight: bold;font-size: 18px;">账号认证</span>
        </div>
        <router-link :to="{name:'Auth'}" style="text-decoration: none">
          <el-button type="primary">返回</el-button>
        </router-link>
      </div>
    </template>
    <el-form :model=""></el-form>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";

const state = reactive({
  form: {
    title: "",
    unique_id: "",

    license_path: "",
    license_path_url: "",

    leader: "",
    leader_identity: "",

    leader_identity_front: "",
    leader_identity_front_url: "",

    leader_identity_back: "",
    leader_identity_back_url: "",
  },
  error: {
    title: "",
    unique_id: "",
    license_path: "",
    leader: "",
    leader_identity: "",
    leader_identity_front: "",
    leader_identity_back: "",
  }
})

</script>

<style scoped>

</style>