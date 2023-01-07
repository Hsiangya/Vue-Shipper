<template>
  <el-card class="box-card">
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
            <span>xxxxx</span>
          </div>
          <div>
            <span>注册时间：</span>
            <span>xxxxx</span>
          </div>
          <div>
            <span>实名认证：</span>
            <span>未实名</span>
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
          <div class="txt">xxxxx</div>
        </div>
        <div>
          <a class="link" href="#" @click="func">
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
          <div class="txt">你已绑定xxxxx(改手机号用于登录、找回密码)</div>
        </div>
        <div>
          <a class="link" href="#" @click="func">
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
</template>

<script setup>
import {User, Edit, Iphone} from "@element-plus/icons-vue"
import {reactive, getCurrentInstance} from "vue";
import {useStore} from "vuex";

const proxy = getCurrentInstance()
const store = useStore()
const state = reactive({
  model: {
    id: "",
    name: "",
    mobile: "",
    ctime: "",
    auth_type: "",
    auth_type_text: "",
  },
  loading: true
});

function InitRequest() {
  let id = store.state.id;
  proxy.axios.get(``)
}
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