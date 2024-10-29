<template>
  <div class="container">
    <aside :class="{ 'sidebar-collapsed': isCollapsed, 'sidebar': !isCollapsed }">
      <div class="new-chat" @click="newChat">
        创建新对话
      </div>
      <chatHistoryCard v-for="(item, index) in session_list" :key="index" :text="item.topic"
        :isac="activateId === item.id" :idx="index" @click="choice(item.id, index)" @delete-message="handleDeleteMessage"/>
    </aside>
    <aside class="sidebar-btn">
      <div class="toggleSidebar" @click="toggleSidebar">
        <img class="toggleSidebar-left" :src="arrowLeft" width="70%" height="70%" alt="">
      </div>
    </aside>
    <div class="main-content">
      <div class="responsive-element">
        <div class="content">
          <div class="message-list" v-if="ac_session.type !== ''">
            <messageCard v-for="(item, index) in ac_session.messages" :key="item.id" :text="item.content" :role="item.role" :idx="index" :messages="ac_session.messages"/>
          </div>
          <div class="choose-type" v-if="ac_session.type === ''">
            <chooseKind @choose-key="handleChoose"/>
          </div>
        </div>
        <div>
          <chatInput @send-message="onSend" :session="ac_session"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import $ from 'jquery'
import { getChatHistory } from '../js/chatHistory'
import { Session } from '../js/session'
import { fetchStream, deleteMessage } from "../js/api";
import chatHistoryCard from '../components/chatHistoryCard.vue'
import messageCard from "../components/messageCard.vue";
import chooseKind from "../components/chooseKind.vue"
import chatInput from "../components/chatInput.vue";
import {getUid, scrollToBottomWithAnimation,login,isValid } from "../js/util";
import arrowLeft from '../assets/arrowleft.svg'
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();



const isCollapsed = ref(false); // 使用ref来创建响应式变量
const activateId = ref("")
onMounted(() => {
  store.dispatch('setInputOccupied', false);
  const queryParams = new URLSearchParams(window.location.search);
  const ticket = queryParams.get('ticket');
  if (ticket !== null) {
    console.log('Ticket:', ticket);
    login(ticket)
  } else {
    isValid()
  }
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    isCollapsed.value = true
    $('.toggleSidebar-left').css('transform', 'scaleX(-1)')
  }
})
function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value; // 切换侧边栏状态
  if (isCollapsed.value === true) {
    $('.toggleSidebar-left').css('transform', 'scaleX(-1)')
  } else {
    $('.toggleSidebar-left').css('transform', 'scaleX(1)')
  }
}

const session_list = ref([])
let ac_session = reactive(new Session())
async function fetchChatHistory() {
  try {
    const chatHistory = await getChatHistory();
    if (chatHistory === "err") {
      console.log("获取聊天记录失败后的错误处理")
    } else if (chatHistory.length === 0) {
      session_list.value.push(new Session());
    } else {
      for (let i of chatHistory) {
        let record = JSON.parse(i.record)
        let file = i.file === undefined? "":i.file;
        session_list.value.unshift(new Session(i.id, i.uid, record.lastUpdate, record.messages, record.topic, record.type, file));
      }
    }
    activateId.value = session_list.value[0].id;
    ac_session = session_list.value[0];
  } catch (error) {
    console.error('获取聊天记录失败:', error);
  }
}

fetchChatHistory();

function newChat() {
  session_list.value.unshift(new Session())
  activateId.value = session_list.value[0].id
  ac_session = session_list.value[0];
}

function choice(id, index) {
  activateId.value = id;
  ac_session = session_list.value[index];
}

const receiveChoose = ref('');

const handleChoose = (data) => {
  receiveChoose.value = data;
  console.log(receiveChoose.value)
  ac_session.type = receiveChoose.value;
};

const toSendMessage = ref('');

const onSend = (data) => {
  toSendMessage.value = data;
  ac_session.messages.push({
    role: 'user',
    content: toSendMessage.value
  })
  ac_session.messages.push({
    role: 'assistant',
    content: '思考中...',
  })
  setTimeout(() => {
    scrollToBottomWithAnimation("message-list")
  }, 0)
  fetchStream(ac_session);
};

function min(a, b) {
  return a<b?a:b;
}

const handleDeleteMessage = (idx) => {
  session_list.value.splice(idx, 1);
  if (session_list.value.length === 0) {
    session_list.value.push(new Session());
  }
  choice(session_list.value[min(idx, session_list.value.length - 1)].id, min(idx, session_list.value.length - 1))
  deleteMessage(session_list.value[min(idx, session_list.value.length - 1)].id)
      .then(res => {
        const toast = () => {
          ElMessage({
            message: '删除成功',
            type: 'success',
            plain: true,
            duration: 1000
          })
        }
        toast()
      })
      .catch(e => {
        console.log(e)
      })
}


</script>

<style scoped>
.container {
  display: flex;
  height: calc(100vh - 60px);
  overflow: hidden;
}

.sidebar {
  flex-shrink: 0;
  width: 200px !important;
  background-color: #eeeeee;
  transition: all 0.3s;
  overflow-y: auto;
}

.sidebar-collapsed {
  width: 0;
  transform: translateX(-200px);
  transition: all 0.3s;
  background-color: #eeeeee;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
  min-width: calc(100% - 200px);
  padding: 0;
}


.responsive-element {
  width: 90%;
  max-width: 90%;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (min-width: 768px) {
  .responsive-element {
    width: 60%;
  }
}

.message-list {
  height: 100%;
  overflow-y: auto;
  width: 100%;
  scrollbar-width: none;
  overflow-x: hidden;
}

.message-list::-webkit-scrollbar {
  scrollbar-width: none;
}

.content{
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding-bottom: 20px;
  overflow-x: hidden;
}

.sidebar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
}

.toggleSidebar {
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

.toggleSidebar-left {
  width: 30px;
  transition: all 0.3s;
}

.new-chat {
  border-radius: 5px;
  border: 1px gray dashed;
  margin: 10px;
  text-align: center;
  font-size: small;
  padding: 5px;
}

.new-chat:hover {
  background-color: rgba(128, 128, 128, 0.1);
}

.choose-type {
  top: 0;
  width: 100%;
}

.font_notoSansSC {
  font-family: 'NotoSansSC-Regular';
  font-size: 18px;
  color: #141414;
}
</style>
