<template>
  <div class="container">
    <aside :class="{ 'sidebar-collapsed': isCollapsed, 'sidebar': !isCollapsed }">
      <div class="new-chat" @click="newChat">
        创建新对话
      </div>
      <chatHistoryCard v-for="(item, index) in session_list" :key="item.id" :text="item.topic" :isac="activateId === item.id" @click="choice(item.id, index)"/>
    </aside>
    <aside class="sidebar-btn">
      <div class="toggleSidebar" @click="toggleSidebar">
        <img class="toggleSidebar-left" src="/icon/arrowleft.svg" width="70%" height="70%">
      </div>
    </aside>
    <div class="main-content">
      <div class="responsive-element">
        <messageCard v-for="item in ac_message" :key="item.id" :text="item.content" :role="item.role"/>
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
import chatHistoryCard from '../components/chatHistoryCard.vue'
import messageCard from "../components/messageCard.vue";
const isCollapsed = ref(false); // 使用ref来创建响应式变量
const activateId = ref("")
function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value; // 切换侧边栏状态
  if (isCollapsed.value === true) {
    $('.toggleSidebar-left').css('transform', 'scaleX(-1)')
  }else {
    $('.toggleSidebar-left').css('transform', 'scaleX(1)')
  }
}

const session_list = ref([])
const ac_message = ref([])
async function fetchChatHistory() {
    try {
        const chatHistory = await getChatHistory('111');
        if (chatHistory === "err") {
          console.log("获取聊天记录失败后的错误处理")
        }else {
          for (let i of chatHistory) {
            let record = JSON.parse(i.record)
            session_list.value.unshift(new Session(i.id, i.uid, record.lastUpdate, record.messages, record.topic, record.type));
          }
        }
        activateId.value = session_list.value[0].id;
        ac_message.value = session_list.value[0].message;
    } catch (error) {
        console.error('获取聊天记录失败:', error);
    }
}

fetchChatHistory();

function newChat() {
  session_list.value.unshift(new Session())
  activateId.value = session_list.value[0].id
  ac_message.value = session_list.value[0].message;
}

function choice(id, index) {
  activateId.value = id;
  ac_message.value = session_list.value[index].message;
  // console.log(session_list.value[index].message);
  // console.log(ac_message.value)
}
</script>

<style scoped>
.container {
  display: flex;
  height: calc(100vh - 60px);
}

.sidebar {
  flex-shrink: 0;
  width: 200px !important;
  background-color: #eeeeee;
  transition: all 0.3s;
  overflow-y: auto;
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
  width: 0px;
}
.toggleSidebar{
  width: 30px;
  height: 30px;
  background-color: #eeeeee;
  border-radius: 0 50% 50% 0;
  display: flex;
  align-items: center;
  justify-content: center; 
  transform: translateX(10px);
  z-index: 100;
}
.toggleSidebar-left{
  width: 30px;
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
.new-chat:hover{
  background-color: rgba(128, 128, 128, 0.1);
}
</style>
