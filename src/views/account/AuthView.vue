<template>

  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header" style="display: flex;justify-content: space-between;align-items: center">
        <span style="font-weight: bold;font-size: 18px;">账号认证</span>
        <div>
          <el-tag type="danger">未认证</el-tag>
          <el-tag type="warning">认证中</el-tag>
          <el-tag type="success">已认证</el-tag>
        </div>
        <router-link :to="{name:'AuthEdit'}" style="text-decoration: none;">
          <el-button type="primary">编辑</el-button>
        </router-link>
      </div>
    </template>
    <el-alert
        type='error'
        title='审核失败'
        description='text descriptionmoretext descriptionmoretext descriptionmoretext descriptionmoretext descriptionmoretext descriptionmore'
        closable="false"/>
    <div style="padding: 0 20px">
      <div>
        <h4>企业信息</h4>
        <el-row :gutter="10" class="info-row">
          <el-col :span='4' class="row-left">公司名称</el-col>
          <el-col :span='15' class="row-right">{{ state.data.title }}</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span='4' class="row-left">统一社会信用代码</el-col>
          <el-col :span='15' class="row-right">{{ state.data.unique_id }}</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span='4' class="row-left">营业执照</el-col>
          <el-col :span='15' class="row-right" v-if="state.data.license_path">
            <el-image
                style="width: 150px;height: 100px"
                :src="state.data.license_path"
                :preview-src-list="[state.data.license_path]"
                fit="cover"
            />
          </el-col>
          <el-col :span="8" class="row-right" v-else>
            无
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";

const state = reactive(
    {
      data: {
        title: "", // 企业名称
        unique_id: "", // 信用代码
        license_path: "", // 营业执照
        leader: "", // 企业法人
        leader_identity: "",
        leader_identity_front: "",// 身份证正面
        leader_identity_back: "", // 身份证反面
      }
    }
)
</script>

<style scoped>

</style>