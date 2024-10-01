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
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Text from './Text.vue';
//数组的接收方法
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
    justify-content: center;
    align-items: center;

    width: 52px;
    height: 52px;
    margin: 2px;
}

.avator {
    display: flex;

    width: 48px;
    height: 48px;
    border-radius: 5px
}
.message{
  width: 100%;
}

</style>