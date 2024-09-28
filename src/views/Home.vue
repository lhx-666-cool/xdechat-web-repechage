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
      <div class="responsive-element">
        <div class="input">
          <textarea name="userinput" id="userinput" rows="5" class="userinput"></textarea>
          <button class="send">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import $ from 'jquery'
import { getChatHistory } from '../js/chatHistory'
import { Session } from '../js/session'

const isCollapsed = ref(false); // 使用ref来创建响应式变量

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value; // 切换侧边栏状态
  if (isCollapsed.value === true) {
    $('.toggleSidebar-left').css('transform', 'scaleX(-1)')
  }else {
    $('.toggleSidebar-left').css('transform', 'scaleX(1)')
  }
}

let session_list = []
async function fetchChatHistory() {
    try {
        const chatHistory = await getChatHistory('111');
        if (chatHistory === "err") {
          console.log("获取聊天记录失败后的错误处理")
        }else {
          for (let i of chatHistory) {
            // console.log(i)
            let record = JSON.parse(i.record)
            // console.log(i.id, i.uid, record.lastUpdata, record.message, record.topic, record.type)
            session_list.push(new Session(i.id, i.uid, record.lastUpdate, record.messages, record.topic, record.type));
          }
        }
        console.log(session_list)
    } catch (error) {
        console.error('获取聊天记录失败:', error);
    }
}

fetchChatHistory();
</script>

<style scoped>
.container {
  display: flex;
  height: calc(100vh - 60px);
}

.sidebar {
  width: 200px;
  background-color: #eeeeee;
  transition: all 0.3s;
}

.sidebar-collapsed {
  width: 0px;
  transform: translateX(-200px);
  transition: all 0.3s;
  background-color: #eeeeee;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center; 
  height: 100%; 
  width: 100%;
  padding: 0;
}

.userinput{
  flex-grow: 1;
  resize: none;
  width: 100%;
  border: 0px;
  background-color: #F6F6F6;
  font-size: larger
}
.userinput:focus{
  outline: none;
}
.send{
  flex-shrink: 0;
  width: 50px;
  border: 0;
  background-color: #117554;
  color: whi;
  border-radius: 5px;
  font-weight: bolder;
  color: white;
}
.responsive-element {
  width: 90%;
  max-width: 90%;
  padding: 20px;
  box-sizing: border-box; 
  margin: 0 auto;
  position: relative;
  position: relative;
}
@media (min-width: 768px) { 
  .responsive-element {
    width: 60%; 
  }
}

.input{
  position: absolute;
  bottom: 30px;
  height: 100px;
  border-radius: 5px;
  background-color: #F6F6F6;
  width: calc(100% - 40px);
  border: 1px gray solids;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  padding: 10px;
  display: flex
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
