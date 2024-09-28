<template>
  <div class="container">
    <aside :class="{ 'sidebar-collapsed': isCollapsed, 'sidebar': !isCollapsed }">
      <div class="new-chat">
        创建新对话
      </div>
      
    </aside>
    <aside class="sidebar-btn">
      <div class="toggleSidebar" @click="toggleSidebar">
        <img class="toggleSidebar-left" src="/icon/arrowleft.svg" width="70%" height="70%">
      </div>
    </aside>
    <div class="main-content">
      <!-- 主内容区 -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import $ from 'jquery'
const isCollapsed = ref(false); // 使用ref来创建响应式变量

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value; // 切换侧边栏状态
  if (isCollapsed.value === true) {
    $('.toggleSidebar-left').css('transform', 'scaleX(-1)')
  }else {
    $('.toggleSidebar-left').css('transform', 'scaleX(1)')
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: calc(100vh - 60px);
}

.sidebar {
  width: 200px;
  background-color: #eeeeee;
  transition: width 0.3s;
}

.sidebar-collapsed {
  width: 0px;
  transition: width 0.3s;
  background-color: #eeeeee;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}


.sidebar-btn{
  display: flex;
  align-items: center;
  justify-content: center; 
}
.toggleSidebar{
  width: 30px;
  height: 30px;
  background-color: #eeeeee;
  border-radius: 0 50% 50% 0;
  display: flex;
  align-items: center;
  justify-content: center; 
}
.toggleSidebar-left{
  transition: all 0.3s;
}
.new-chat{
  border-radius: 5px;
  border: 1px gray dashed;
  margin: 10px;
  text-align: center;
  font-size: small;
  padding: 5px;
}
</style>
