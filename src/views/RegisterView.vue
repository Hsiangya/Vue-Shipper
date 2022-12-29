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
            <el-form size="large" :model="RegisterModel" :rules="RegisterRules" ref="RegisterRef" label-width="80px">
              <el-form-item style="margin-top: 24px;" prop="name" :error="RegisterError.name" label="企业简称">
                <el-input v-model="RegisterModel.name" placeholder="请输入企业简称"/>
              </el-form-item>


              <el-form-item style="margin-top: 24px;" prop="mobile" :error="RegisterError.mobile" label="手机号码">
                <el-input v-model="RegisterModel.mobile" placeholder="请输入手机号码"/>
              </el-form-item>


              <el-form-item style="margin-top: 24px;" prop="code" :error="RegisterError.code" label="验证码">
                <el-input v-model="RegisterModel.code" placeholder="请输入验证码"/>
              </el-form-item>


              <el-form-item style="margin-top: 24px;" prop="pwd" :error="RegisterError.pwd" label="密码">
                <el-input v-model="RegisterModel.pwd" placeholder="请输入密码"/>
              </el-form-item>


              <el-form-item style="margin-top: 24px;" prop="pwdConfirm" :error="RegisterError.pwdConfirm" label="确认密码">
                <el-input v-model="RegisterModel.pwdConfirm" placeholder="请输入确认密码"/>
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
import {getCurrentInstance, reactive} from "vue";

const {proxy} = getCurrentInstance()

const RegisterModel = reactive({
  name: '',
  mobile: '',
  code: '',
  pwd: '',
  pwdConfirm: ''
})

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('重复密码不能为空'))
  } else if (value !== RegisterModel.pwd) {
    callback(new Error("密码不一致"))
  } else {
    callback()
  }
}
const RegisterRules = reactive({
  name: [
    {required: true, message: '企业名称不能为空', trigger: 'blur'},
  ],
  mobile: [
    {required: true, message: '手机号不能为空', trigger: 'blur'},
    //{ pattern:/^[a-z]+$/, message: '格式错误', trigger: 'blur'},
  ],
  code: [
    {required: true, message: '验证码不能为空', trigger: 'blur'},
  ],
  pwd: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 28, message: '密码长度至少6个字符', trigger: 'blur'}
  ],
  pwdConfirm: [
    {validator: validatePass2, trigger: 'blur'},
  ]
})
const RegisterError = reactive({
  name: '',
  mobile: '',
  code: '',
  pwd: '',
  pwdConfirm: '',
})


/**
 * 注册
 */
function Register() {
  // 清除自定义错误
  clearFormError(RegisterError)

  // 表单验证 ref 属性
  // this.$refs.userRef
  proxy.$refs.RegisterRef.validate((valid) => {
    // 校验失败
    if (!valid) {
      console.log("校验失败");
      return false;
    }

    // 校验成功，发送网络请求（基于axios发送）
    console.log("校验成功", RegisterModel)
    // 1.请求成功，token写入vuex + 跳转
    // 2.错误提示
    //     ElMessage.error('用户名或密码错误');
    //     每个表单展示相应的错误
    let res = {code: -1, error: {name: "用户名错误", pwd: "密码格式出问题了"}}
    validateFormError(RegisterError, res.error);
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
