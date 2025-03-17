<template>
  <div id="navbar-out">
    <div class="navbar-left">
      <el-avatar shape="square" :src="logo" />
      <span id="navbar-text"><span style="color: #b8001f;">慧通</span>大模型</span>
    </div>
    <div class="navbar-right">
      <!-- 右侧内容 -->
      <div class="navbar-ava">
        <el-avatar :src="unlogin" :size="30" />
        <div class="navbar-user">
          <el-dropdown placement="bottom-end">
            <span class="name">
              {{ userName }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="userName!=='未登录'" @click="logout">退出登录</el-dropdown-item>
                <el-dropdown-item v-if="userName==='未登录'" @click="jump2Ids">点击登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
      
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { jump2Ids, logout } from '../js/util'
import logo from '../assets/logo.svg'
import unlogin from '../assets/unlogin.svg'
const userName = ref("")
console.log(localStorage.getItem("username"))
userName.value = localStorage.getItem("username")!==null?localStorage.getItem("username"):"未登录";
</script>

<style scoped>
#navbar-out {
  height: 48px;
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  background-color: transparent;
}

#navbar-text {
  font-size: 1.2em;
  font-weight: bolder;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #424242;
  margin-left: 20px;
  background-color: transparent;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none;    /* Firefox */
  -ms-user-select: none;     /* IE10+/Edge */
  user-select: none;         /* Standard */
}
.navbar-user {
  font-size: small;
}
.navbar-ava {
  display: flex;
  align-items: center;
  gap: 10px;
}
.features {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
  font-size: 1.2em;
  font-weight: bolder;
  color: #424242;
}
</style>
