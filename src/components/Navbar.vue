<template>
  <div id="navbar-out">
    <div class="navbar-left">
      <el-avatar shape="square" src="/src/assets/logo.svg" />
      <span id="navbar-text"><span style="color: #b8001f;">慧通</span>大模型</span>
    </div>
    <div class="navbar-right">
      <!-- 右侧内容 -->
      <div class="navbar-ava">
        <el-avatar src="/icon/unlogin.svg" :size="30" />
        <div class="navbar-user">未登录</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
}
.navbar-user {
  font-size: small;
}
.navbar-ava {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
