<template>
  <el-card class="box-card" v-loading="state.loading">
    <template #header>
      <div class="card-header">
        <span style="font-weight: bold;font-size: 18px;">基本信息</span>
      </div>
    </template>
    <div style="padding: 0 20px">
      <el-row justify="start">
        <el-row justify="center" align="middle">
          <div>
            <img src="../../assets/avatar.jpg" style="height: 90px">
          </div>
        </el-row>
        <div class="info">
          <div>
            <span>用户ID：</span>
            <span>{{ state.model.id }}</span>
          </div>
          <div>
            <span>注册时间：</span>
            <span>{{ state.model.ctime }}</span>
          </div>
          <div v-if="state.model.auth_type===3">
            <span>实名认证：</span>
            <span>
              <el-tag class="ml-2" type="info">{{ state.model.auth_type_text }}</el-tag>
            </span>
          </div>
          <div v-else-if="state.model.auth_type===2">
            <span>实名认证：</span>
            <span>
              <el-tag class="ml-2" type="warning">{{ state.model.auth_type_text }}</el-tag>
            </span>
          </div>
          <div v-else>
            <span>实名认证：</span>
            <span>
              <el-tag class="ml-2" type="danger">{{ state.model.auth_type_text }}</el-tag>
            </span>
            <div>
              <el-tag style="margin-top: 10px;" type=danger>{{ state.model.auth_type_text }}
              </el-tag>
              <router-link :to="{name:'Auth'}">
                <el-link type="danger" style="font-weight: normal;margin-left: 10px;"> 点击前往认证中心</el-link>
              </router-link>
            </div>
          </div>
        </div>
      </el-row>
      <el-divider border-style="dotted"/>
      <div class="rows">
        <div class="group">
          <div class="key">
            <el-icon>
              <User/>
            </el-icon>
            <span>用户名</span>
          </div>
          <div class="txt">{{ state.model.name }}</div>
        </div>
        <div>
          <a class="link" href="#" @click="UserDialogVisible=true">
            <el-icon>
              <Edit/>
            </el-icon>
            修改
          </a>
        </div>
      </div>
      <el-divider border-style="dotted"/>
      <div class="rows">
        <div class="group">
          <div class="key">
            <el-icon>
              <Iphone/>
            </el-icon>
            <span>绑定手机</span>
          </div>
          <div class="txt">你已绑定{{ state.model.mobile }}(该手机号用于登录、找回密码)</div>
        </div>
        <div>
          <a class="link" href="#" @click="MobileDialogVisible=true">
            <el-icon>
              <Edit/>
            </el-icon>
            修改
          </a>
        </div>
      </div>
      <el-divider border-style="dotted"/>
      <el-row justify="center" align="middle" style="height: 80px;">
        <el-button type="primary" style="width: 200px;height: 40px;">退出登录</el-button>
      </el-row>
    </div>
  </el-card>

  <el-dialog v-model="UserDialogVisible" title="修改企业名称" width="30%">
    <el-form :model="state.UserDialog.from" :rules="state.UserDialog.rules" ref="UserRef" label-width="80px">
      <el-form-item :error="state.UserDialog.errors.name">
        <el-input v-model="state.UserDialog.from.name" placeholder="请输入需要修改的企业名称"/>
      </el-form-item>
      <el-row justify="center" align="middle" style="height: 80px;">
        <el-button type="primary" style="width: 200px;height: 40px;" @click="DoUpdateName">提交审核
        </el-button>
      </el-row>
    </el-form>
  </el-dialog>

  <el-dialog v-model="MobileDialogVisible" title="修改绑定手机号" width="30%">
    <el-form :model="state.MobileDialog.from" :rules="state.MobileDialog.rules" ref="UserRef" label-width="80px">
      <el-form-item :error="state.MobileDialog.errors.mobile">
        <el-input v-model="state.MobileDialog.from.mobile" placeholder="请输入需要修改的绑定手机号"/>
      </el-form-item>
      <el-row justify="center" align="middle" style="height: 80px;">
        <el-button type="primary" style="width: 200px;height: 40px;" @click="DoUpdateMobile">提交审核
        </el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {User, Edit, Iphone} from "@element-plus/icons-vue"
import {reactive, getCurrentInstance, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import {validateFormError, clearFormError} from '@/plugins/form'

const {proxy} = getCurrentInstance()
const store = useStore()
const router = useRouter()
const UserDialogVisible = ref(false)
const MobileDialogVisible = ref(false)
const state = reactive({
  model: {
    id: "",
    name: "",
    mobile: "",
    ctime: "",
    auth_type: "",
    auth_type_text: "",
  },
  loading: true,
  UserDialog: {
    from: {
      name: "",
    },
    rules: {
      name: [{required: true, message: '企业名称不能为空', trigger: 'blur'},],
    },
    errors: {
      name: "",
    }
  },
  MobileDialog: {
    from: {
      mobile: "",
    },
    rules: {
      mobile: [{required: true, message: '手机号不能为空', trigger: 'blur'},],
    },
    errors: {
      mobile: "",
    }
  }
});

// 修改名称
function DoUpdateName() {
  // 清除自定义错误
  clearFormError(state.UserDialog.errors);
  let id = store.state.id;
  proxy.$axios.patch(`api/shipper/basic/${id}/?type=name`, state.UserDialog.from).then(res => {
    // console.log(res.data)
    if (res.data.code === 1000) {
      state.model.name = res.data.data.name;
      UserDialogVisible.value = false;
      ElMessage.success("修改名称成功");
    } else if (res.data.code === 2001) {
      validateFormError(state.UserDialog.errors, res.data.detail);
    } else {
      ElMessage.error(res.data.message);
    }
  })

}

// 修改手机号
function DoUpdateMobile() {
  // 清除自定义错误
  clearFormError(state.MobileDialog.errors);
  let id = store.state.id;
  proxy.$axios.patch(`api/shipper/basic/${id}/?type=mobile`, state.MobileDialog.from).then(res => {
    // console.log(res.data)
    if (res.data.code === 1000) {
      state.model.mobile = res.data.data.mobile;
      MobileDialogVisible.value = false;
      ElMessage.success("修改绑定手机");
    } else if (res.data.code === 2001) {
      validateFormError(state.MobileDialog.errors, res.data.detail);
    } else {
      ElMessage.error(res.data.message);
    }
  })

}

// 初始化请求
function InitRequest() {
  let id = store.state.id;
  // console.log(store.state)
  proxy.$axios.get(`api/shipper/basic/${id}/`).then((res) => {
    // console.log(res.data);
    if (res.data.code === 1000) {
      state.model = res.data.data
      state.loading = false
    } else {
      // console.log(2222);
      ElMessage({
        showClose: true,
        message: '登录已失效，请重新登录',
        type: 'error',
      });
      router.replace({name: "Login"});
    }

  })
}

onMounted(() => {
  InitRequest()
})
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-left: 20px;
}


.info > div {
  font-size: 14px;
  padding: 2px 0;
  color: #666;
}


.rows {
  display: flex;
  justify-content: space-between;
}

.rows .group {
  display: flex;
}

.rows .group .key {
  display: flex;
  align-items: center;
  width: 200px;
  font-size: 18px;
}

.rows .group .key span {
  display: inline-block;
  margin-left: 10px;
}

.rows .group .txt {
  font-size: 14px;
  color: #666;
}

.rows .link {
  display: flex;
  align-items: center;
  color: #0088f5;
  font-size: 14px;
}
</style>