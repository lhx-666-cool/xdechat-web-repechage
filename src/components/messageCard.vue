<template>
    <div class="message" :class="{ 'message-user': role === 'user' }">
        <div class="avatorContainer" :class="{ 'hide': role === 'user' }">
            <img :src="logo" class="avator unselectable">

        </div>

        <div class="avatorContainer" :class="{ 'hide': role === 'assistant' }">
            <img :src="user" class="avator unselectable">

        </div>
        <!--        <div class="text" :class="{ 'text-user': role === 'user', 'text-bot': role === 'assistant' }" @mouseover="showExtra[idx] = true" @mouseout="temp(); console.log('移除')">-->
        <div class="text" :class="{ 'text-user': role === 'user', 'text-bot': role === 'assistant' }">
            <Text :text="text" />
            <!--            <div class="icons" v-if="role === 'assistant' && showExtra[idx]" @mouseover="showExtra[idx] = true; toast('111')">-->
            <div class="icons" v-if="role === 'assistant'">

                <button class="copy actions" @click="copyToClip(text.replace(regex, '')); toast('复制成功')"
                    title="复制">
                    <img :src="copy" class="avator unselectable icon" title="复制">
                </button>

                <button class="like actions"  title="点赞" @click="like()">
                    <img :src="likeIcon" class="avator unselectable icon">
                </button>

                <button class="copy actions" title="点踩" @click="dislike">
                    <img :src="dislikeIcon" class="avator unselectable icon">
                </button>

                <button class="copy actions" title="反馈" @click="feedbackDialog = true">
                    <img :src="feedbackIcon" class="avator unselectable icon">
                </button>
            </div>
        </div>
    </div>
    <el-dialog v-model="feedbackDialog" title="反馈" width="500" align-center>
        <el-input v-model="feedbackMessage" maxlength="100" :rows="5" style="" placeholder="请输入反馈信息" show-word-limit
            type="textarea" resize="none" />
        <br>
        <br>
        <el-button type="primary" @click="feedback">提交反馈</el-button>
    </el-dialog>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import Text from './Text.vue';
import { copyToClip } from "../js/copy.ts";
import { addFeedback } from "../js/api.js";
import logo from '../assets/logo.svg'
import user from '../assets/user.svg'
import copy from '../assets/copy.svg'
import likeIcon from '../assets/like.svg'
import dislikeIcon from '../assets/dislike.svg'
import feedbackIcon from '../assets/feedback.svg'

const feedbackDialog = ref(false)
const feedbackMessage = ref("")
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
    },
    idx: {
        type: Number,
        required: true
    },
    messages: {
        type: Array,
        required: true
    }
})

function like() {
    addFeedback(JSON.stringify(props.messages), "like", '')
        .then((res) => { console.log(res); toast("点赞成功") })
        .catch((err) => { console.log(err) })
}

function dislike() {
    addFeedback(JSON.stringify(props.messages), "dislike", '')
        .then((res) => { console.log(res); toast("反馈成功") })
        .catch((err) => { console.log(err) })
}

function feedback() {
    if (feedbackMessage.value === '') {
        toast("反馈内容不能为空")
        return;
    }
    addFeedback(JSON.stringify(props.messages), "feedback", feedbackMessage.value)
        .then((res) => { console.log(res); toast("反馈成功") })
        .catch((err) => { console.log(err) })
    feedbackMessage.value = ""
    feedbackDialog.value = false
}
</script>

<style scoped>
.message-user {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.hide {
    display: none !important;
}

.text {
    display: inline-block;
    margin: 10px 10px 2px 10px;
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
.dark .text-user {
    background-color: rgb(25, 78, 45);
}

.dark .text-user * {
    color: #bcc3ca;
}

.dark .text-bot {
    background-color: #1e1e20;
}

.dark .text-bot * {
    color: #bcc3ca;
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

.message {
    width: 100%;
}

.icons {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    margin-bottom: 2px;
    z-index: 8;
}

.icon {
    height: 16px;
    width: 16px;
}

.actions {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 5px;
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
    border: 0px;
    border-radius: 10px;
}

.actions:hover {
    transform: scale(1.05);
}
</style>