<template>
  <div class="main">
    <div class="login-box">
      <div class="tab-box-switch">
        <ul class="switch-ul">
          <li @click="tabSelected=index" :class="tabSelected===index?'tab-active':''"
              v-for="(txt,index) in tabList" :key="index">{{ txt }}
            <!--for循环遍历列表值与索引，key=索引，并显示值
                判断tabSelected是否与index相等，如果相等，class='tab-active'，否则为空
                class='tab-active'的标签由CSS控制在底部添加标记
                点击时触发事件，tabselected=index-->
          </li>
        </ul>
        <div v-show="tabSelected===0">
          <el-form size="large" :model="state.from.userModel" :rules="state.Rules.userRules" ref="userRef">
            <el-form-item style="margin-top: 24px;" prop="mobile" :error="state.Error.UserError.mobile">
              <el-input v-model="state.from.userModel.mobile" placeholder="手机号"/>
            </el-form-item>
            <el-form-item style="margin-top: 24px;" prop="password" :error="state.Error.UserError.password">
              <el-input v-model="state.from.userModel.password" placeholder="密码"/>
            </el-form-item>
            <el-form-item style="margin-top: 24px;">
              <el-button @click="PasswordLogin" type="primary">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="tabSelected===1">
          <el-form size="large" :model="state.from.SmsModel" :rules="state.Rules.SmsRules" ref="SmsRef">
            <el-form-item style="margin-top: 24px;" prop="mobile" :error="state.Error.SmsError.mobile">
              <el-input v-model="state.from.SmsModel.mobile" placeholder="手机号"/>
            </el-form-item>
            <el-form-item style="margin-top: 24px;" prop="code" :error="state.Error.SmsError.code">
              <el-row justify="space-between" style="width: 100%">
                <el-input v-model="state.from.SmsModel.code" placeholder="验证码" style="width: 220px"/>
                <el-button :disabled="BtnSmsDisabled"
                           @click="SendSms">
                  {{ BtnSmsText }}
                </el-button>
              </el-row>

            </el-form-item>
            <el-form-item style="margin-top: 24px;">
              <el-button @click="SmsLogin" type="primary">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ElMessage} from 'element-plus'
import {ref, reactive, getCurrentInstance,} from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {validateFormError, clearFormError} from '@/plugins/form'

const store = useStore();
const router = useRouter();
const {proxy} = getCurrentInstance()
// 登录模式
const tabList = reactive(["密码登录", "免密码登录"])
const state = reactive(
    {
      from: {
        SmsModel: {
          mobile: '13600334401',
          code: '',
        },
        userModel: {
          mobile: '13600334401',
          password: 'xy159951',
        }
      },
      Rules: {
        SmsRules: {
          mobile: [{required: true, message: '手机号不能空', trigger: 'blur'},],
          // code: [
          //   {required: true, message: '验证码不能为空', trigger: 'blur'},]
        },
        userRules: {
          mobile: [{required: true, message: '用户名不能为空', trigger: 'blur'},],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, max: 28, message: '密码长度至少6个字符', trigger: 'blur'}
          ],
        }
      },
      Error: {
        SmsError: {
          mobile: '',
          code: '',
        },
        UserError: {
          mobile: '',
          password: '',
        }
      }
    })
let tabSelected = ref(0)
// 短信登录
const BtnSmsText = ref("发送验证码");
const BtnSmsDisabled = ref(false);

// 发送验证码
function SendSms() {
  proxy.$refs.SmsRef.validateField("mobile", (valid) => {
    // 校验失败
    if (!valid) {
      ElMessage.error("手机号不能为空");
      return false;
    }
    proxy.$axios.post("api/shipper/send/sms/", state.from.SmsModel).then(res => {
      if (res.data.code === 1000) {
        ElMessage({
          showClose: true,
          message: '短信发送成功，有效时间1分钟',
          type: 'success',
        });
        BtnSmsDisabled.value = true;// 发送验证码按钮禁止点击
        let num = 60;
        let interval = window.setInterval(() => {
          num -= 1;
          BtnSmsText.value = `${num}秒后重发`
          if (num < 1) {
            BtnSmsText.value = "重新发送";
            window.clearInterval(interval);
            BtnSmsDisabled.value = false;
          }
        }, 1000)
      } else if (res.data.code === 2001) {
        validateFormError(state.Error.SmsError, res.data.detail);
        ElMessage.error(res.data.message.mobile[0]);
      } else {
        ElMessage.error(res.data.message);
      }
    })

  })
}

// 密码登录
function PasswordLogin() {
  // 清除自定义错误
  clearFormError(state.Error.UserError)

  proxy.$refs.userRef.validate((valid) => {
    // 校验失败
    if (!valid) {
      console.log("校验失败");
      return false;
    }
    // 校验成功，发送网络请求
    proxy.$axios.post("api/shipper/login/", state.from.userModel)
        .then(res => {
          console.log(res.data)
          if (res.data.status === "success") {
            // console.log("登录成功")
            // 1.保存到vuex + 持久化
            console.log(res.data.data)
            store.commit("login", res.data.data);
            // 2.跳转到后台
            ElMessage({
              message: '登录成功，2S后跳转基础页面',
              type: 'success',
            });
            setInterval(function () {
              router.replace({name: "Basic"})
            }, 2000);
            // vue3中proxy代之vue2中的this
            // proxy.$store.commit("login", res.data.data);
            // proxy.router({name: "Basic"})
          } else if (res.data.code === -1) {
            // {code: -1, error: {user: "用户名错误", pwd: "密码格式出问题了"}}
            validateFormError(state.Error.UserError, res.data.detail);
          } else {
            //{"code": -2, 'msg': "用户名或密码错误"}
            ElMessage.error(res.data.message);
          }
        })
    // let res = {code: -1, error: {user: "用户名错误", password: "密码格式出问题了"}}
    // validateFormError(UserError, res.error);
  });
}

// 短信登录
function SmsLogin() {
  // 清除自定义错误
  clearFormError(state.Error.SmsError);

  proxy.$refs.SmsRef.validate((valid) => {
    // 校验失败
    if (!valid) {
      ElMessage.error("数据校验失败");
      return false;
    }

    // 校验成功，发送网络请求
    proxy.$axios.post("api/shipper/login/sms/", state.from.SmsModel)
        .then(res => {
          if (res.data.code === 1000) {
            // 1. 保存到vuex
            store.commit("login", res.data.data);

            // 2. 跳转
            ElMessage({
              showClose: true,
              message: '登录成功',
              type: 'success',
            });
            router.replace({name: "Basic"})
          } else if (res.data.code === 2001) {
            validateFormError(state.Error.SmsError, res.error);
          } else {
            ElMessage.error(res.data.message);
          }
        })

  });
}

</script>
<style scoped>
.main {
  background-color: #f5f5f5;
  /*Viewport Height 相对视口高度*/
  height: calc(100vh - 72px) /* 动态计算 高度-导航窗高度 */
}

.login-box {
  width: 350px;
  min-height: 200px;
  background-color: white;
  margin: 150px auto;
  border-radius: 2px; /*圆角*/
  padding: 0 44px 10px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}

.tab-box-switch .switch-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-box-switch .switch-ul li {
  display: inline-block; /*行内块*/
  height: 60px;
  font-size: 16px;
  line-height: 60px;
  margin-right: 24px;
  cursor: pointer;
}

.tab-active {
  position: relative;
  color: #1a1a1a;
  font-weight: 600;
  font-synthesis: style;
}


.tab-active::before {
  display: block;
  position: absolute;
  bottom: 0;
  content: "";
  width: 100%;
  height: 3px;
  background-color: #0084ff;
}
</style>