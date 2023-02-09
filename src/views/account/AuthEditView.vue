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
    <el-form :model="state.form" ref="FormRef" label-width="140px">
      <div>
        <h4>企业信息</h4>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item style="margin-top:24px" :error="state.error.title" label="企业名称">
              <el-input v-model="state.form.title" placeholder="企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-top:24px" :error="state.error.unique_id" label="统一社会信用代码">
              <el-input v-model="state.form.unique_id" placeholder="统一社会信用代码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item style="margin-top:24px;" :error="state.form.license_path" label="营业执照">
              <ul v-if="state.form.license_path" class="el-upload-list el-upload-list--picture-card"
                  style="width: 200px;height: 150px;">
                <li class="el-upload-list__item is-success" style="width: 200px;height: 120px;">
                  <img class="el-upload-list__item-thumbnail" :src="state.form.license_path_url">

                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="state.DialogLicenceVisible=true">
                      <el-icon><ZoomIn/></el-icon>
                    </span>
                    <span class="el-upload-list__item-delete" @click="RemoveLicenceImage"></span>
                    <el-icon><Delete/></el-icon>
                  </span>
                </li>
              </ul>
              <el-upload
                  v-else
                  style="width: 200px;height: 150px;"
                  drag
                  :data="{type:'licence_path'}"
                  :show-file-list="false"
                  :multiple="false"
                  :action="imageUploadUrl"
                  :before-upload="beforeImageUpload"
                  :on-success="uploadSuccessWrapper('licence_path')">
                <el-icon class="el-icon--upload">
                  <UploadFilled/>
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-col>

        </el-row>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";
import {UploadFilled, ZoomIn, Delete} from '@element-plus/icons-vue'

const state = reactive({
  DialogLicenceVisible: false,
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

function RemoveLicenceImage() {

}
</script>

<style scoped>

</style>