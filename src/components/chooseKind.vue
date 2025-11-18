<template>
    <div class="choose">
        <div class="title no-select">
            欢迎使用<br>西电慧通大模型
        </div>
        <div class="feature-box no-select">
            <div class="feature">
                <div class="teach tag active" @click="chooseKind(0, 'teach')">
                    教
                </div>
                <div class="learn  tag" @click="chooseKind(1, 'learn')">
                    学
                </div>
                <!-- <div class="admin  tag" @click="chooseKind(2, 'admin')">
                    管
                </div>
                <div class="review  tag" @click="chooseKind(3, 'review')">
                    评
                </div> -->
            </div>
        </div>

        <div class="btns">
            <div v-for="(item, index) in allKinds[option]" :key="index">
                <div class="choose-card no-select" @click=choose(item.key)>
                    <div class="img">
                        <img :src="imageMap[item.key]" height="30px" draggable="false">
                    </div>
                    {{ item.desc }}
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
import instruct_design from '../assets/instruct_design.svg'
import chat from '../assets/chat.svg'
import paper from '../assets/paper.svg'
import $ from 'jquery';
import task from '../assets/task.svg'
import graduate_paper from '../assets/graduate_paper.svg'
import doctor_paper from '../assets/doctor_paper.svg'
import origanzation from '../assets/organization.svg'

const imageMap = {
    system_inquiry: system_database,
    compute_qa: compute_database,
    circuit_qa: circuit_database,
    communication_qa: communication_database,
    microelectronics_qa: microelectronics_database,
    chat: chat,
    paper: paper,
    instruction_design_generation: instruct_design,
    test_question_generation: task,
    undergraduate_paper: paper,
    academic_graduate_paper: graduate_paper,
    engineer_graduate_paper: graduate_paper,
    academic_doctor_paper: doctor_paper,
    engineer_doctor_paper: doctor_paper,
    organization_department: origanzation,
    graduate_evaluation: graduate_paper,
    generate_plan_report: doctor_paper,
    generate_speech: doctor_paper,
    hr_service: doctor_paper,
};



const emit = defineEmits(['choose-key']);
const allKinds = ref([])
const option = ref(0)

function chooseKind(idx, className) {
    option.value = idx;
    $('.tag').removeClass('active');
    $(`.${className}`).addClass('active');
}
async function fetchKinds() {
    try {
        const res = await getKinds();
        if (res === "err") {
            console.log("获取类型失败的错误处理")
        } else {
            allKinds.value = res.data;
            console.log(allKinds.value)
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
.choose {
    overflow-y: auto;
    max-height: 600px;
    overflow-x: hidden;
}

.title {
    margin-top: 80px;
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: rgb(155, 155, 155);
}

.choose-card {
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

.choose-card:hover {
    transform: scale(1.1);
}

.dark .choose-card {
    background-color: #4f525a;
    color: white;
}

.btns {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.no-select {
    user-select: none;
    /* Standard syntax */
    -webkit-user-select: none;
    /* Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    cursor: pointer;
}

.feature {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid rgb(58, 139, 255);
    border-radius: 50px;
    width: 100%;
    max-width: 400px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

}

.feature-box {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
}

.tag {
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: rgb(58, 139, 255, 0.5);
    color: rgb(0, 106, 255);
    font-weight: bolder;
    font-size: 1.2em;
}


.tag:hover {
    background-color: rgb(58, 139, 255, 0.7);
    cursor: pointer;
}

.teach {
    border-radius: 50px 0 0 50px;
    border-right: 2px solid rgb(58, 139, 255);
}

.active {
    background-color: rgb(58, 139, 255);
    color: white;

}

.admin {
    border-left: 2px solid rgb(58, 139, 255);

}

.learn {
    border-radius: 0 50px 50px 0;
    border-left: 2px solid rgb(58, 139, 255);
}
</style>