<template>
  <div class="card" :class="{ 'ac': isac }">
    <img :src="message" height="18px">
    <span class="text">
      {{ text }}
    </span>
    <img :src="deleteIcon" height="18px" :class="{ 'hide': !isac }" @click.stop="deleteMessage" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
import message from '../assets/message.svg'
import deleteIcon from '../assets/delete.svg'

const emit = defineEmits(['delete-message']);
const deleteMessage = () => {
  emit('delete-message', props.idx);
};

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  isac: {
    type: Boolean,
    required: true,
  },
  idx: {
    type: Number,
    required: true
  }
})

</script>

<style scoped>
.card {
  border-radius: 5px;
  border: 1px rgba(128, 128, 128, 0.3) solid;
  margin: 10px;
  text-align: left;
  font-size: 16px;
  padding: 10px;

  display: flex;
  align-items: center;
  transition: all 0.3ms;
}

.text {
  margin-left: 10px;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'NotoSansSC-Regular';
}

.ac {
  background-color: rgba(128, 128, 128, 0.3) !important;
  transition: all 0.3ms;
}

.card:hover {
  background-color: rgba(128, 128, 128, 0.1);
}

.hide {
  display: none;
}

* {
  cursor: pointer;
}
</style>