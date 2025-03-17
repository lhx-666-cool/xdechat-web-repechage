<template>
  <div class="fileBox" v-if="session.file !== ''">
    <div class="fileicon">
      <img :src="fileIcon">
    </div>
    <div class="desc">
      {{ getSubstringAfterFirstUnderscore(session.file) }}
      <br>
      <span class="filetype">
        PDF
      </span>
    </div>
  </div>
  <input type="file" ref="fileInput" accept=".pdf" style="display: none;" @change="handleFileChange">
  <div class="chatInputComponent">
    <!-- <div>
      <button class="upload" @click="uploadFile">
        <img :src="uploadIcon" alt="上传" />
      </button>
    </div> -->
    <el-tooltip
      class="box-item"
      effect="dark"
      content="深度思考"
      placement="top"
    >
      <div class="thinkicon no-select"  @click="handleThink">
        <img :src="thinkIcon" alt="思考" style="fill:#424242">
      </div>
    </el-tooltip>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="本地知识库检索"
      placement="top"
    >
      <div class="lricon no-select"  @click="handlelr">
        <img :src="localRrtrievalIcon" alt="本机检索" style="fill:#424242">
      </div>
    </el-tooltip>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="搜索模式"
      placement="top"
    >
      <div class="oricon no-select"  @click="handleor">
        <img :src="onlineRrtrievalIcon" alt="网络检索" style="fill:#424242">
      </div>
    </el-tooltip>
    <div class="chatInputContainer">
      <textarea name="chatinput" class="chatInput" :style="{ height: textareaHeight }" ref="chatInputArea"
        @input="onInput" @keydown="handleKeydown" :placeholder="props.session.type === '' ? '请选择类别' : '问点什么'"
        rows="1"></textarea>
    </div>
    
    <button class="send" @click="onSend" :disabled="isInputOccupied || props.session.type === ''">
      <img :src="sendIcon" alt="发送" />
    </button>
  </div>
</template>

<script setup>
import { defineEmits, ref, nextTick } from 'vue'
import { scrollToBottom, scrollToBottomWithAnimation } from "../js/util.js";
import $, { data } from 'jquery'
import { useStore } from 'vuex';
const store = useStore();
import { computed, watch } from 'vue';
const isInputOccupied = computed(() => store.state.isInputOccupied);
import { defineProps } from 'vue';
import { Session } from "../js/session.js";
import { uploadFileFunc } from '../js/api';
import fileIcon from '../assets/file.svg'
import uploadIcon from '../assets/upload.svg'
import sendIcon from '../assets/send.svg'
import thinkIcon from '../assets/think.svg'
import thinkActivateIcon from '../assets/thinkactivate.svg'
import localRrtrievalIcon from '../assets/local_retrieval.svg'
import onlineRrtrievalIcon from '../assets/online_retrieval.svg'
import localRetrievalAc from '../assets/local_retrieval_ac.svg'
import onlineRetrievalAc from '../assets/online_retrieval_ac.svg'

const props = defineProps({
  session: {
    type: Session,
    required: true
  }
})

const toast = (message, type) => {
    ElMessage({
        message: message,
        type,
        plain: true,
        duration: 1000
    })
}



const chatInputArea = ref(null)
const textareaHeight = ref("auto")
const fileInput = ref(null)
const think = ref(false);
const lr = ref(false);
const or = ref(false);

const id = computed(() => props.session.id)

function uploadFile() {
  fileInput.value.click();
}

function handleThink(e, n=false) {
  if (think.value || n) {
    think.value = false;
    $('.thinkicon img').attr("src", thinkIcon);
    $('.thinkicon').css('background-color', 'transparent')
    props.session.r1_model = false;
    return;
  }
  think.value = true;
  props.session.r1_model = true;
  $('.thinkicon img').attr("src", thinkActivateIcon);
  $('.thinkicon').css('background-color', '#00b7ff54')
}

function handlelr(e, n=false) {
  if (lr.value || n) {
    lr.value = false;
    $('.lricon img').attr("src", localRrtrievalIcon);
    $('.lricon').css('background-color', 'transparent')
    props.session.local_retrieval = false;
    return;
  }
  lr.value = true;
  props.session.local_retrieval = true;
  $('.lricon img').attr("src", localRetrievalAc);
  $('.lricon').css('background-color', '#00b7ff54')
}

function handleor(e, n=false) {
  if (or.value || n) {
    or.value = false;
    $('.oricon').css('background-color', 'transparent')
    $('.oricon img').attr("src", onlineRrtrievalIcon);
    props.session.online_retrieval = false;
    return;
  }
  or.value = true;
  props.session.online_retrieval = true;
  $('.oricon img').attr("src", onlineRetrievalAc);
  $('.oricon').css('background-color', '#00b7ff54')
}

watch(id, () => {
  handleThink("", true);
  handlelr("", true);
  handleor("", true);
})

function handleFileChange() {
  const file = event.target.files[0];
  if (file) {
    if (file.type !== 'application/pdf') {
      toast("上传文件必须为PDF", "error")
      fileInput.value.value = ''
      return;
    }
    if (file.size > (20 * 1024 * 1024)) {
      toast("文件不可大于20MB", "error")
      fileInput.value.value = ''
      return;
    }
    toast("请稍等，文件正在上传", "message")
    uploadFileFunc(file)
    .then((res) => {
      toast("文件上传成功", "success")
      props.session.file = res.filename
    })
    .catch((e) => {
      toast("文件上传失败", "error")
      console.log(e)
    })
  }
}
function onInput() {
  textareaHeight.value = 'auto';
  nextTick(() => {
    const scrollHeight = chatInputArea.value.scrollHeight;
    textareaHeight.value = `${scrollHeight - 16}px`;
  });
}

function getSubstringAfterFirstUnderscore(str) {
    const underscoreIndex = str.indexOf('_');
    if (underscoreIndex === -1) {
        // If there is no underscore in the string, return an empty string or handle accordingly
        return '';
    }
    return str.slice(underscoreIndex + 1);
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

.no-select {
  user-select: none; /* Standard syntax */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  cursor: pointer;
}
.chatInputComponent {
  display: flex;
  align-items: center;

  bottom: 28px;
  min-height: 42px;
  max-height: 180px;
  border-radius: 32px;
  background-color: #F6F6F6;
  width: calc(100% - 20px);
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
  padding: 0排序10px 8px 20px;

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

.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 0;
  background-color: transparent;
  border-radius: 25px;
  font-weight: bolder;
  color: white;
  rotate: 2;
  transition: 0.5s;
}

.upload:hover {
  background-color: #dfdfdf;
  cursor: pointer;
}

.fileBox {
  display: flex;
  padding: 5px;
  background-color: rgb(246, 246, 246);
  margin-bottom: 5px;
  border-radius: 5px;
  width: 200px;
  align-items: center;
  height: 45px;
  justify-content: space-between;
}

.fileicon {
  background-color: #cb3b3b;
  border-radius: 5px;
  height: 35px;
  margin-left: 5px;
  padding-top: 2px;
}

.thinkicon, .lricon, .oricon {
  border-radius: 25px;
  height: 40px;
  width: 30px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease; /* 过渡效果 */
  margin-left: 2px;
}

.thinkicon:hover, .lricon:hover, .oricon:hover {
  background-color: #dfdfdf;
  cursor: pointer;
}

.thinkicon-ac, .lricon-ac, .oricon-ac {
  border-radius: 25px;
  height: 40px;
  width: 40px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00b7ff54;
}
.desc {
  flex-grow: 1;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: small;
  white-space: nowrap;
}

.filetype {
  font-weight: bolder;
  color: #989898;
}
</style>