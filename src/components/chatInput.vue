<template>
  <div class="chatInputComponent">
    <div class="chatInputContainer"> <textarea name="chatinput" class="chatInput" :style="{ height: textareaHeight }"
        ref="myTextarea" @input="onInput" placeholder="字体改了，舒服多了" rows="1"></textarea></div>

    <button class="send"><img src="../assets/send.svg" /></button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  data() {
    return {
      textareaHeight: 'auto'
    }
  },
  methods: {
    onInput() {
      console.log(this.textareaHeight);
      this.textareaHeight = 'auto';
      this.textareaHeight = this.$refs.myTextarea.scrollHeight - 8 + 'px'
    }
  }
}
</script>

<style Lang="sass" scoped>
.chatInputComponent {
  position: absolute;
  display: flex;
  align-items: center;

  bottom: 28px;
  min-height: 42px;
  max-height: 180px;
  border-radius: 32px;
  background-color: #F6F6F6;
  width: calc(100% - 40px);
  border: 1px gray solids;
  padding: 10px;
  display: flex
}

.chatInputContainer {
  display: flex;
  width: 100%;
  height: auto;
  max-height: 25dvh;
}

.chatInput {
  display: flex;
  flex-grow: 1;
  padding: 8px 5px 8px 20px;

  resize: none;
  width: 100%;
  min-height: 32px;
  height: 32px;
  max-height: 140px;
  font-size: 48px;
  border: 0px;
  background-color: transparent;
  overflow: hidden;

  font-family: 'NotoSansSC-Regular';
  font-size: 18px;
  color: #141414;

  outline: none;
}

.send {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border: 0;
  background-color: #117554;
  color: whi;
  border-radius: 25px;
  font-weight: bolder;
  color: white;
  rotate: 2;
  transition: 0.5s;
}

.send:hover {
  background-color: #054b33;
  scale: 1.05;
  transition: 0.5s;
}
</style>