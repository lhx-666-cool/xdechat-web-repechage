<template>
    <aside class="chatLogSideBarContainer">
        <div class="chatLogSideBar">
            <div class="collapseArrowArea">
                <div class="collapseArrowBar">
                    <div class="collapseArrowContainer">
                        <img class="collapseArrowImg" alt="Collapse"
                            src="../assets/chatLogSidebar/double_arrow_lm.svg" />
                    </div>
                </div>
            </div>

            <div class="chatLogArea" id="chatLogArea">
                <div class="chatLogBar" v-for="(log, index) in chatLogs" :key="index">
                    <div class="chatLogItemImgContainer">
                        <img class="chatLogItemImg" src="../assets/chatLogSidebar/chat_bubble_lm.svg" />
                    </div>
                    <div class="chatLogItemText">{{ log.chatLogTitle }}</div>
                </div>
            </div>

            <div class="extraSettingsArea">

            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue';

// 定义一个聊天记录数组
const chatLogs = ref([
    { chatLogTitle: 'New' },
    { chatLogTitle: 'Looooooooooooooooooooooooooooooooog' },
    { chatLogTitle: 'Chat 3' },
    { chatLogTitle: 'OHHHHHHHH' }
]);
</script>

<style scoped>
.chatLogSideBarContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 5px;
    top: 5px;
    width: 280px;
    height: 100%;
    background-color: #e0e0e0;
}

.chatLogSideBar {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 250px;
    height: 880px;
    margin: 2px;
}

.collapseArrowArea {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: auto;
    margin: 2px;

}

.chatLogArea {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 640px;
    margin: 2px;
}

.extraSettingsArea {
    display: flex;
    position: absolute;
    bottom: 10px;
    width: 240px;
    height: 150px;
    margin: 2px;
}




.collapseArrowBar {
    display: flex;
    justify-content: right;
    align-items: center;
    height: 46px;
    width: 235px;
    margin: 2px;
    border-radius: 24px;
    transition: 0.6s;
}

.collapseArrowBar:hover {
    background-color: #e0e0e0;
    transition: 0.6s;
}

.collapseArrowContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    width: 38px;
    margin-right: 5px;
}

.collapseArrowImg {
    display: flex;
    height: 32px;
    width: 32px;
}




.chatLogBar {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 235px;
    height: 46px;
    margin: 2px;
    background-color: transparent;
    border-radius: 100px;
}

.chatLogBar:hover {
    background-color: #c5c5c5;
    cursor: pointer;
}

.chatLogItemImgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin: 2px 8px 2px 12px;
}

.chatLogItemImg {
    display: flex;
    width: 21px;
    height: 21px;
}

.chatLogItemText {
    font-size: 15px;
    max-width: 160px;
    overflow: hidden;
}
</style>