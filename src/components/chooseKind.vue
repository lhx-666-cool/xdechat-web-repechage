<template>
    <div class="choose">
        <div class="title">
            欢迎使用<br>西电慧通大模型
        </div>
        <div class="btns">
            <div v-for="(item, index) in kinds" :key="index">
                <div class="choose-card no-select" @click=choose(item.key) >
                    <div class="img">
                        <img :src="imageMap[item.key]" height="30px" draggable="false">
                    </div>
                    {{ item.describe }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { getKinds } from '../js/api';
import system_database from '../assets/system_database.svg'
import compute_database from '../assets/compute_database.svg'
import circuit_database from '../assets/circuit_database.svg'
import communication_database from '../assets/communication_database.svg'
import microelectronics_database from '../assets/microelectronics_database.svg'
import chat from '../assets/chat.svg'
import paper from '../assets/paper.svg'

const imageMap = {
  system_database: system_database,
  compute_database: compute_database,
  circuit_database: circuit_database,
  communication_database: communication_database,
  microelectronics_database: microelectronics_database,
  chat: chat,
  paper: paper
};

const emit = defineEmits(['choose-key']);
const kinds = ref([])
async function fetchKinds() {
  try {
    const res = await getKinds();
    if (res === "err") {
      console.log("获取类型失败的错误处理")
    } else {
        kinds.value = res
    }
  } catch (error) {
    console.error('获取聊天记录失败:', error);
  }
}

fetchKinds();

function choose(key) {
    const sendDataToParent = () => {
        emit('choose-key', key);
    };
    sendDataToParent();
}

</script>

<style scoped>
.choose{
    overflow-y: auto;
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
.no-select {
    user-select: none; /* Standard syntax */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    cursor: pointer;
  }

</style>