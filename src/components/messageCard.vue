<template>
    <div class="message">
        <img src="/icon/loge.svg" height="35px" style="border-radius: 5px">
        <div class="text">
            <!-- <markdown-it-vue class="md-body" content="111" /> -->
            <!-- {{ role }} -->
            <Text :text="text" />
            <Text text="
```js
console.log()
```
            " />

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
</style>