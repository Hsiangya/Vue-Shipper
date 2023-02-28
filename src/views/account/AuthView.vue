<template>

  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header" style="display: flex;justify-content: space-between;align-items: center">
        <div>
          <span style="font-weight: bold;font-size: 18px;">账号认证</span>
          <el-tag :type="state.data.auth_type_class" style="margin-left:10px">{{ state.data.auth_type_text }}</el-tag>
        </div>
        <router-link :to="{name:'AuthEdit'}" style="text-decoration: none;">
          <el-button type="primary">编辑</el-button>
        </router-link>
      </div>
    </template>
    <el-alert v-if="state.data.mark"
              type='error'
              title='审核失败'
              :description='state.data.remark'
              :closable="false"/>
    <div style="padding: 0 20px">
      <div>
        <h4>企业信息</h4>
        <el-row :gutter="10" class="info-row">
          <el-col :span='4' class="row-left">公司名称</el-col>
          <el-col :span='15' class="row-right">{{ state.data.title || "无" }}</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span='4' class="row-left">统一社会信用代码</el-col>
          <el-col :span='15' class="row-right">{{ state.data.unique_id || "无" }}</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span='4' class="row-left">营业执照</el-col>
          <el-col :span='15' class="row-right" v-if="state.data.licence_path">
            <el-image
                style="width: 150px;height: 100px"
                :src="state.data.licence_path"
                :preview-src-list="[state.data.licence_path]"
                fit="cover"
            />
          </el-col>
          <el-col :span="8" class="row-right" v-else>
            无
          </el-col>
        </el-row>
      </div>
      <el-divider border-style="dotted"/>
      <div>
        <h4>法人信息</h4>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" class="row-left">法人姓名</el-col>
          <el-col :span="15" class="row-right">{{ state.data.leader || "无" }}</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" style="text-align: left" class="row-left">法人身份证</el-col>
          <el-col :span="15" style="text-align: left;" class="row-right">{{ state.data.leader_identity || "无" }}
          </el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" class="row-left">法人身份证头像面</el-col>
          <el-col :span="8" class="row-right" v-if="state.data.leader_identity_front">
            <el-image
                style="width: 150px;height: 100px"
                :src="state.data.leader_identity_front"
                :preview-src-list="[state.data.leader_identity_front]"
                fit="cover"
            />
          </el-col>
          <el-col :span="8" class="row-right" v-else>
            无
          </el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" class="row-left">法人身份证国徽面</el-col>
          <el-col :span="8" class="row-right" v-if="state.data.leader_identity_back">
            <el-image
                style="width: 150px;height: 100px"
                :src="state.data.leader_identity_back"
                :preview-src-list="[state.data.leader_identity_back]"
                fit="cover"
            />
          </el-col>
          <el-col :span="8" class="row-right" v-else>
            无
          </el-col>
        </el-row>
      </div>
    </div>
    <el-divider border-style="dotted"/>

  </el-card>
</template>

<script setup>
import {reactive, onMounted, getCurrentInstance} from "vue";
import {UploadFilled, ZoomIn, Delete} from '@element-plus/icons-vue'
import {validateFormError, clearFormError} from "@/plugins/form";
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'

const {proxy} = getCurrentInstance()
const store = useStore()
const state = reactive(
    {
      data: {
        auth_type_text: "未认证",
        auth_type_class: "danger", //success primary
        title: "", // 企业名称
        unique_id: "", // 信用代码
        license_path_url: "", // 营业执照
        leader: "", // 企业法人
        leader_identity: "",
        leader_identity_front_url: "",// 身份证正面
        leader_identity_back_url: "", // 身份证反面
        remark: "", // 备注信息
      }
    }
)

function initRequest() {
  let id = store.state.id; // company_id
  proxy.$axios.get(`/api/shipper/auth/${id}/`).then((res) => {
    console.log(res);
    if (res.data.code === 1000) {
      // 成功
      // state.data = res.data.data;
      state.data = {...res.data.data};
    } else if (res.data.code === 2004) {
      ElMessage.error(res.data.message);
    }
  })
}

onMounted(() => {
  initRequest()
})
</script>

<style scoped>

</style>