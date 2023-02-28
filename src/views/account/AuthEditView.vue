<template>
  <el-card class="box-card" shadow="never" v-loading="state.loading.front_loading">
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
            <el-form-item style="margin-top:24px;" :error="state.error.license_path" label="营业执照">
              <ul v-if="state.form.license_path_url" class="el-upload-list el-upload-list--picture-card"
                  style="width: 200px;height: 150px;">
                <li class="el-upload-list__item is-success" style="width: 200px;height: 120px;">
                  <img class="el-upload-list__item-thumbnail" :src="state.form.license_path_url"/>

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
                  :before-upload="function (file){return HandleBefore(file,'license')}"
                  :on-success="uploadSuccessWrapper('licence_path','license_path_url','license')"
                  v-loading="state.loading.license"
              >
                <!--参数说明：
                :data="{type:'licence_path'}" ===> 请求体中会携带该数据
                drag:启用拖拽上传                      data：上传时附带的参数
                show-file-list:是否显示已上传文件列表    multiple:是否支持多选文件
                action:上传时请求的url                 on-success:文件上传成功时的钩子
                before-upload:上传文件之前的钩子，参数为上传的文件 返回false或Promise且被reject，则停止上传。
                -->

                <el-icon class="el-icon--upload">
                  <upload-filled/>
                </el-icon>
                <template #tip>
                  <div class="el-upload__tip"
                       style="text-align:center;font-size:8px;margin-top:0;line-height:25px;">
                    只能上传png文件，且不超过6M
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-divider border-style="dotted"/>
      <div>
        <h4>法人信息</h4>

        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item style="margin-top: 24px;" :error="state.error.leader" label="法人姓名">
              <el-input v-model="state.form.leader" placeholder="法人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-top: 24px;" :error="state.error.leader_identity"
                          label="法人身份证">
              <el-input v-model="state.form.leader_identity" placeholder="法人身份证"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item style="margin-top: 24px" :error="state.error.leader_identity_front"
                          label="法人身份证正面">
              <el-upload
                  class="avatar-uploader"
                  :action="imageUploadUrl"
                  :on-success="uploadSuccessWrapper('leader_identity_front','leader_identity_front_url','card_front')"
                  :data="{type:'front'}"
                  :before-upload="function (file){return HandleBefore(file,'card_front')}"
                  :show-file-list="false"
                  v-loading="state.loading.card_front"
              >
                <img v-if="state.form.leader_identity_front_url"
                     :src="state.form.leader_identity_front_url"
                     class="avatar"/>
                <el-icon v-else class="avatar-uploader-icon">
                  <upload-filled/>
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-top: 24px;" :error="state.form.leader_identity_back"
                          label="法人身份证国徽面">
              <el-upload
                  class="avatar-uploader"
                  :action="imageUploadUrl"
                  :data="{type:'back'}"
                  :on-success="uploadSuccessWrapper('leader_identity_back','leader_identity_back_rul','card_back')"
                  :show-file-list="false"
                  v-loading="state.loading.card_back"
              >
                <img v-if="state.form.leader_identity_back_url" :src="state.form.leader_identity_back_url"
                     class="avatar"/>
                <el-icon v-else class="avatar-uploader-icon">
                  <upload-filled/>
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-divider border-style="dotted"/>
      <el-row justify="center" align="middle" style="height: 80px;">
        <el-button type="primary" style="width: 200px;height: 40px;" @click="DoSubmit">提交审核</el-button>
      </el-row>
    </el-form>
  </el-card>

  <!--对话框-->
  <el-dialog v-model="state.DialogLicenceVisible">
    <!--其中w-full是一个Vue.js模板语法，用于将图片的宽度设置为其容器的100％，即铺满整个容器的宽度。-->
    <img w-full :src=state.form.license_path_url alt="Preview Image" style="width: 100%;height: 100%"/>
  </el-dialog>
</template>

<script setup>
import {reactive, onMounted, getCurrentInstance} from "vue";
import {UploadFilled, ZoomIn, Delete} from '@element-plus/icons-vue'
import {validateFormError, clearFormError} from "@/plugins/form";
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'

const store = useStore();
const {proxy} = getCurrentInstance()
const state = reactive({
  loading: {
    license: false,
    card_front: false,
    card_back: false,
    front_loading: false
  },
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

// 上传时请求的url,非axios请求，需要使用完整URL
const imageUploadUrl = "http://127.0.0.1:8000/api/shipper/auth/upload/"


// 上传文件前的钩子
function HandleBefore(file, ImageFile) {
  state.loading[ImageFile] = true;
  const isPNG = file.type === 'image/png';
  const isLt2m = file.size / 1024 / 1024 < 6;
  if (!isPNG) {
    state.loading[ImageFile] = false;
    ElMessage.error("上传图片只能是PNG格式！")
  }
  if (!isLt2m) {
    state.loading[ImageFile] = false;
    ElMessage.error("上传图片大小不能超过6MB！")
  }
  return isPNG && isLt2m
}


// 上传文件之后的回调函数，对函做闭包处理
function uploadSuccessWrapper(fieldName, preViewFieldName, ImageFile) {
  return function (res) {
    if (res.code === 1000 && res.type === "front") {
      // 1. 图片的地址+返回时添加
      // 2. 服务器支持访问静态图片
      state.form[fieldName] = res.data.url; // 返回的url地址更新到地址上
      state.form[preViewFieldName] = res.data.abs_url;
      state.form.leader = res.data.leader;
      state.form.leader_identity = res.data.leader_identity;
      // console.log(state.form)
    } else if (res.code === 1000 && res.type === "licence_path") {
      state.form[fieldName] = res.data.url; // 返回的url地址更新到地址上
      state.form[preViewFieldName] = res.data.abs_url;
      state.form.title = res.data.title;
      state.form.unique_id = res.data.unique_id;
      // console.log(state.form)
    } else if (res.code === 5001) {
      ElMessage.error(res.message)
    } else {
      ElMessage.error("上传失败：" + res.message)
    }
    state.loading[ImageFile] = false;
  }
}

// 移除图片
function RemoveLicenceImage() {
  state.form.licence_path_url = ""
  state.form.licence_path = ""
}

// 提交数据
// function DoSubmit() {
//   state.loading.front_loading = true;
//   //表单验证
//   clearFormError(state.error);
//   console.log(state.form)
//
//   // 发送请求
//   proxy.$axios.post("/api/shipper/auth/", state.form).then(res => {
//     console.log(res);
//     state.loading.front_loading = false;
//   })
// }

function initRequest() {
  let id = store.state.id; // company_id
  proxy.$axios.get(`/api/shipper/auth/${id}/`).then((res) => {
    console.log(res);
    if (res.data.code === 0) {
      // 成功
      // state.data = res.data.data;
      state.form = {...res.data.data};
    } else if (res.data.code === -2) {
      ElMessage.error(res.data.msg);
    }
  })
}

onMounted(() => {
  initRequest()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 200px;
  height: 120px;
  display: block;
}

.el-upload-dragger {
  padding: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 120px;
  text-align: center;
}
</style>