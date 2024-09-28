<template>
    <div class="choose">
        <div class="title">
            欢迎使用<br>西电慧通大模型
        </div>
        <div class="btns">
            <div v-for="(item, index) in kinds" :key="index">
                <div class="choose-card">
                    <div class="img">
                        <img :src="'/src/assets/'+item.key+'.svg'" height="30px">
                    </div>
                    {{ item.describe }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getKinds } from '../js/api';

const kinds = ref([])
async function fetchKinds() {
  try {
    const res = await getKinds();
    if (res === "err") {
      console.log("获取类型失败的错误处理")
    } else {
        console.log(res)
        kinds.value = res
    }
  } catch (error) {
    console.error('获取聊天记录失败:', error);
  }
}

fetchKinds();
console.log(kinds.value)
</script>

<style scoped>
.choose{
    overflow-y: scroll;
    max-height: 600px;
    overflow-x: hidden;
}
.title{
   margin-top: 80px; 
   text-align: center;
   font-size: 30px;
   font-weight: bolder;
   color: rgb(155, 155, 155);
}
.choose-card{
    width: 100px;
    height: 140px;
    margin: 20px;
    text-align: center;
    background-color: rgb(241, 240, 240);
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    transition: transform 0.3s ease;
}
.choose-card:hover{
    transform: scale(1.1);
}
.btns{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

</style>