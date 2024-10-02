<template>
    <div class="chatLogSideBarContainer">
        <div class="chatLogSideBar">
            <div class="collapseArrowArea">
                <div class="collapseArrowBar">
                    <div class="collapseArrowContainer">
                        <img class="collapseArrowImg" alt="Collapse" src="../assets/chatLogSidebar/arrow_right.svg" />
                    </div>
                </div>
            </div>
            <div class="chatLogArea"></div>
            <div class="extraSettingsArea"></div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.chatLogSideBarContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 5px;
    top: 5px;
    width: 240px;
    height: 890px;
    background-color: #c5c5c5;
}

.chatLogSideBar {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 230px;
    height: 880px;
    margin: 2px;
    border: #2c2c2c solid 1px;
    /* Test Only*/
}

.collapseArrowArea {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: auto;
    margin: 2px;

}

.chatLogArea {
    display: flex;
    width: 220px;
    height: 640px;
    margin: 2px;
    border: #2c2c2c solid 1px;
    /* Test Only*/
}

.extraSettingsArea {
    display: flex;
    position: absolute;
    bottom: 10px;
    width: 220px;
    height: 150px;
    margin: 2px;
    border: #2c2c2c solid 1px;
    /* Test Only*/
}




.collapseArrowBar {
    display: flex;
    justify-content: right;
    align-items: center;
    height: 46px;
    width: 215px;
    margin: 2px;
    border-radius: 24px;
    transition: 0.6s;
}

.collapseArrowBar:hover{
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
</style>