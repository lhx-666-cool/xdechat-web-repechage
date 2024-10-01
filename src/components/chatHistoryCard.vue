<template>
<div class="card" :class="{'ac': isac}">
    <img src="/icon/message.svg" height="18px">
    <span class="text">
        {{ text }}
    </span>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
//数组的接收方法
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    isac: {
        type: Boolean,
        required: true,
    }
})

</script>

<style scoped>
.card{
    border-radius: 5px;
    border: 1px rgba(128, 128, 128, 0.3) solid;
    margin: 10px;
    text-align: left;
    font-size: small;
    padding: 10px;

    display: flex;
    align-items: center;
    transition: all 0.3ms;
  }
.text{
    margin-left: 10px;
    width: 140px;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
}
.ac{
    background-color: rgba(128, 128, 128, 0.3) !important;
    transition: all 0.3ms;
}
.card:hover{
    background-color: rgba(128, 128, 128, 0.1);
}
</style>