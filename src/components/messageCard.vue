<template>
    <div class="message" :class="{ 'message-user': role === 'user' }">
        <div class="avatorContainer" :class="{ 'hide': role === 'user' }">
            <img src="../assets/logo.svg" class="avator unselectable">

        </div>

        <div class="avatorContainer" :class="{ 'hide': role === 'assistant' }">
            <img src="../assets/user.svg" class="avator unselectable">

        </div>
        <div class="text" :class="{ 'text-user': role === 'user', 'text-bot': role === 'assistant' }">
          <Text :text="text" />
          <div class="icons" v-if="role==='assistant'">
            <div class="copy actions" @click="copyToClip(text.replace(regex, ''));toast('复制成功')">
              <img src="../assets/copy.svg" class="avator unselectable icon">
            </div>
            <div class="like actions">
              <img src="../assets/like.svg" class="avator unselectable icon">
            </div>
            <div class="copy actions">
              <img src="../assets/dislike.svg" class="avator unselectable icon">
            </div>
            <div class="copy actions">
              <img src="../assets/feedback.svg" class="avator unselectable icon">
            </div>
          </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Text from './Text.vue';
import { copyToClip } from "../js/copy.ts";
//数组的接收方法
const toast = (message) => {
  ElMessage({
    message: message,
    type: 'success',
    plain: true,
    duration: 1000
  })
}
const regex = /\n\n----------\n##### 当前对话次数: \d+\/\d+，对话次数过多可能会导致模型回复不准确\n$/g;

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.message-user {
    display: flex;
    /* 启用flexbox布局 */
    flex-direction: column;
    align-items: flex-end;
}

.hide {
    display: none !important;
}

.text {
    display: inline-block;
    margin: 10px 10px 20px 10px;
    padding: 20px 25px;
    border-radius: 28px;
    max-width: calc(100% - 60px);
    overflow: auto;
}

div {
    font-family: 'NotoSansSC-Regular';
}

.text-bot {
    background-color: rgb(235, 235, 235);
}

.text-user {
    margin-top: 5px;
    background-color: rgb(210, 249, 209);

}

.unselectable {
    -webkit-user-select: none;
    /* Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* IE 10+ 和 Edge */
    user-select: none;
    /* 标准语法 */
    pointer-events: none;
}

.avatorContainer {
    display: flex;
    justify-content: left;
    align-items: flex-end;
    width: auto;
    height: 42px;
    margin: 2px;
}

.avator {
    display: flex;

    width: 38px;
    height: 38px;
    border-radius: 5px
}
.message{
  width: 100%;
}
.icons{
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: -10px;

}
.icon{
  height: 15px;
  width: 15px;
}
.actions{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px #aeaeae solid;
  border-radius: 30px;
  padding: 2px 5px;
  background-color: rgb(230, 230, 230);
  transition: transform 0.3s ease;
  cursor: pointer;
  margin-right: 10px;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE 10+ 和 Edge */
  user-select: none;
  /* 标准语法 */
}
.actions:hover{
  transform: scale(1.05);
}
</style>