<template>
  <div class="chatInputComponent">
    <div class="chatInputContainer">
      <textarea name="chatinput" class="chatInput" :style="{ height: textareaHeight }" ref="chatInputArea"
        @input="onInput" @keydown="handleKeydown" :placeholder="props.session.type === '' ? '请选择类别' : '问点什么'"
        rows="1"></textarea>
    </div>
    <button class="send" @click="onSend" :disabled="isInputOccupied || props.session.type === ''"><img
        src="../assets/send.svg" alt="发送按钮" /></button>
  </div>
</template>

<script setup>
import { defineEmits, ref, nextTick } from 'vue'
import { scrollToBottom, scrollToBottomWithAnimation } from "../js/util.js";
import $, { data } from 'jquery'
import { useStore } from 'vuex';
const store = useStore();
import { computed } from 'vue';
const isInputOccupied = computed(() => store.state.isInputOccupied);
import { defineProps } from 'vue';
import { Session } from "../js/session.js";


const props = defineProps({
  session: {
    type: Session,
    required: true
  }
})

const chatInputArea = ref(null)
const textareaHeight = ref("auto")
function onInput() {
  textareaHeight.value = 'auto';
  nextTick(() => {
    const scrollHeight = chatInputArea.value.scrollHeight;
    textareaHeight.value = `${scrollHeight - 16}px`;
  });
}
const emit = defineEmits(['send-message']);
function onSend() {
  if (isInputOccupied.value || props.session.type === '') return;
  const input = $('.chatInput')
  if (input.val() === "") {
    return;
  }
  emit('send-message', input.val());
  input[0].value = "";
  store.dispatch('setInputOccupied', true);
  setTimeout(() => {
    scrollToBottomWithAnimation('message-list')
  }, 0)
  onInput();
}

function handleKeydown(event) {
  if (event.shiftKey && event.key === 'Enter') {
    //这里需要记得阻止，不然会有两次换行。同时让onInput处理，因为本质上用户输入被截断了
    $('.chatInput')[0].value += '\n';
    onInput();
    event.preventDefault();
  } else if (event.key === 'Enter') {
    onSend();
    event.preventDefault(); // 阻止默认行为（例如换行）
  }
}

</script>

<style Lang="sass" scoped>
.chatInputComponent {
  display: flex;
  align-items: center;

  bottom: 28px;
  min-height: 42px;
  max-height: 180px;
  border-radius: 32px;
  background-color: #F6F6F6;
  width: calc(100%-20px);
  border: 1px gray solids;
  padding: 10px;
  display: flex
}

.chatInputContainer {
  display: flex;
  width: 100%;
  height: auto;
  max-height: 25dvh;
}

.chatInput {
  display: flex;
  flex-grow: 1;
  padding: 8px 10px 8px 20px;

  resize: none;
  width: 95%;
  min-height: 32px;
  height: 32px;
  max-height: 140px;
  font-size: 48px;
  border: 0px;
  background-color: transparent;
  overflow: auto;

  font-family: 'NotoSansSC-Regular';
  font-size: 18px;
  color: #141414;
  scrollbar-width: none;
  outline: none;
}

.chatInput::-webkit-scrollbar {
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  width: 1em;
}

.send {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border: 0;
  background-color: #117554;
  color: whi;
  border-radius: 25px;
  font-weight: bolder;
  color: white;
  rotate: 2;
  transition: 0.5s;
}

.send:disabled {
  background-color: #666666;
  cursor: not-allowed;
}

.send:hover {
  background-color: #054b33;
  scale: 1.05;
  transition: 0.5s;
}
</style>