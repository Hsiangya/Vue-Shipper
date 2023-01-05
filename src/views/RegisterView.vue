<template>
  <div class="main">
    <div style="width: 1000px;margin: 10px auto;">
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>用户注册</span>
          </div>
        </template>
        <div>
          <div style="width: 460px;margin: 20px auto;">
            <el-form size="large" :model="state.from" :rules="state.rules" ref="RegisterRef" label-width="80px">
              <el-form-item style="margin-top: 24px;" prop="name" :error="state.error.name" label="企业简称">
                <el-input v-model="state.from.name" placeholder="请输入企业简称"/>
              </el-form-item>


              <el-form-item style="margin-top: 24px;" prop="mobile" :error="state.error.mobile" label="手机号码">
                <el-input v-model="state.from.mobile" placeholder="请输入手机号码"/>
              </el-form-item>


              <el-form-item style="margin-top: 24px;" prop="code" :error="state.error.code" label="验证码">
                <el-row justify="space-between" style="width: 100%">
                  <el-input v-model="state.from.code" placeholder="请输入验证码" style="width: 220px"/>
                  <el-button :disabled="btnSmsDisabled" @click="doSendSms">{{ bntSmsText }}</el-button>
                </el-row>
              </el-form-item>


              <el-form-item style="margin-top: 24px;" prop="password" :error="state.error.password" label="密码">
                <el-input v-model="state.from.password" placeholder="请输入密码"/>
              </el-form-item>


              <el-form-item style="margin-top: 24px;" prop="pwdConfirm" :error="state.error.confirm_password"
                            label="确认密码">
                <el-input v-model="state.from.confirm_password" placeholder="请输入确认密码"/>
              </el-form-item>

              <el-form-item style="margin-top: 24px;">
                <el-button @click="Register" type="primary">注 册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script setup>
// 用户名和密码登录
import {getCurrentInstance, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus'

const router = useRouter()
const {proxy} = getCurrentInstance()
// 重复密码与密码一致性校验
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('重复密码不能为空'))
  } else if (value !== state.rules.password) {
    callback(new Error("密码不一致"))
  } else {
    callback()
  }
}
const bntSmsText = ref("发送验证码")
const btnSmsDisabled = ref(false)

// 数据
const state = reactive({
  from: {
    name: "",
    mobile: "",
    code: "",
    password: "",
    confirm_password: ""
  },
  rules: {
    name: [
      {required: true, message: '企业名称不能为空', trigger: 'blur'},
    ],
    mobile: [
      {required: true, message: '手机号不能为空', trigger: 'blur'},
      //{ pattern:/^[a-z]+$/, message: '格式错误', trigger: 'blur'},
    ],
    // code: [
    //   {required: true, message: '验证码不能为空', trigger: 'blur'},
    // ],
    password: [
      {required: true, message: '密码不能为空', trigger: 'blur'},
      {min: 6, max: 28, message: '密码长度至少6个字符', trigger: 'blur'}
    ],
    confirm_password: [
      {validator: validatePass2, trigger: 'blur'},
    ]
  },
  error: {
    name: '',
    mobile: '',
    code: '',
    password: '',
    confirm_password: '',
  },
  // bntSmsText: ref("发送验证码"),
  // btnSmsDisabled: ref(false),
})

// 发送短信验证码
function doSendSms() {
  // 清除自定义错误
  clearFormError(state.error)
  // 表单验证 ref 属性
  // this.$refs.userRef
  proxy.$refs.RegisterRef.validate((valid) => {
    // 校验失败
    if (!valid) {
      console.log("校验失败");
      return false;
    }
    proxy.$axios.post("http://127.0.0.1:8000/api/register/sms/", {
      mobile: state.from.mobile
    }).then((res) => {
      if (res.data.code === 1000) {
        ElMessage({
          message: '验证码发送成功，有效时间5分钟。',
          type: 'success',
        })
        btnSmsDisabled.value = true;// 发送验证码按钮禁止点击
        let num = 60;
        let interval = window.setInterval(() => {
          num -= 1;
          bntSmsText.value = `${num}秒后重发`
          if (num < 1) {
            bntSmsText.value = "重新发送";
            window.clearInterval(interval);
            btnSmsDisabled.value = false;
          }
        }, 1000)
      } else {
        // 2.错误提示
        ElMessage.error('验证码发送失败');
        //     每个表单展示相应的错误
        validateFormError(state.error, res.error);
      }
    })
  });

}

// 注册
function Register() {
  // 清除自定义错误
  clearFormError(state.error)

  // 表单验证 ref 属性
  proxy.$refs.RegisterRef.validate((valid) => {
    // 校验失败
    if (!valid) {
      console.log("校验失败");
      return false;
    }
    proxy.$axios.post("http://127.0.0.1:8000/api/register/", state.from).then((res) => {
      if (res.data.code === 1000) {
        // 跳转到登录界面
        ElMessage({
          message: '注册成功，2S后跳转登录界面',
          type: 'success',
        });
        setInterval(function () {
          router.replace({name: "Login"})
        }, 2000);
      } else {
        // 2.错误提示
        ElMessage.error(res.data.message)
        validateFormError(state.error, res.error);
      }
    })
  });
}

/**
 * 后端返回错误，展示
 */
function validateFormError(errorDict, resError) {
  for (let key in resError) {
    let txt = resError[key];
    errorDict[key] = txt;
  }
}

/**
 * 清除后端返回的错误
 */
function clearFormError(errorDict) {
  for (let key in errorDict) {
    errorDict[key] = ""
  }
}

</script>

<style scoped>
.main {
  background-color: #f5f5f5;
  height: calc(100vh - 72px);
}

</style>
