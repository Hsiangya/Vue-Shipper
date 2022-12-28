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
          <el-form size="large" :model="userModel" :rules="userRules">
            <el-form-item style="margin-top: 24px;" prop="user">
              <el-input v-model="userModel.user" placeholder="手机号"/>
            </el-form-item>
            <el-form-item style="margin-top: 24px;" prop="pwd">
              <el-input v-model="userModel.pwd" placeholder="密码"/>
            </el-form-item>
            <el-form-item style="margin-top: 24px;">
              <el-button type="primary">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="tabSelected===1">
          <el-form size="large" :model="smsModel" :rules="smsRules">
            <el-form-item style="margin-top: 24px;" prop="mobile">
              <el-input v-model="smsModel.mobile" placeholder="手机号"/>
            </el-form-item>
            <el-form-item style="margin-top: 24px;" prop="code">
              <el-row justify="space-between" style="width: 100%">
                <el-input v-model="smsModel.code" placeholder="验证码" style="width: 220px"/>
                <el-button :disabled="btnSmsDisabled" @click="doSendSms">{{ bntSmsText }}</el-button>
              </el-row>

            </el-form-item>
            <el-form-item style="margin-top: 24px;">
              <el-button type="primary">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from "vue";

// 登录模式
const tabList = reactive(["密码登录", "免密码登录"])
let tabSelected = ref(0)

// 密码登录
const userModel = reactive({
  user: '',
  pwd: '',
})

const userRules = reactive({
  user: [
    {required: true, message: '用户名不能为空', trigger: 'blur'},
  ],
  pwd: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 28, message: '密码长度至少6个字符', trigger: 'blur'}
  ],
})

// 短信登录
const bntSmsText = ref("发送验证码");
const btnSmsDisabled = ref(false);
const smsModel = reactive({
  mobile: '',
  code: '',
});
const smsRules = reactive({
  mobile: [
    {required: true, message: '手机号不能空', trigger: 'blur'},
  ],
  code: [
    {required: true, message: '验证码不能为空', trigger: 'blur'},
  ]
})

function doSendSms() {
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