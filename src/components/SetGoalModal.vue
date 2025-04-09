<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>목표 금액 입력</h3>

      <input
        v-model.number="localGoal"
        type="number"
        placeholder="금액을 입력하세요"
      />
      <div class="btn-group">
        <button @click="submitGoal">입력</button>

        <!-- <button @click="$emit('close')">닫기</button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['show']);
const emit = defineEmits(['submit', 'close']);

const localGoal = ref('');

function submitGoal() {
  if (localGoal.value > 0) {
    emit('submit', localGoal.value); // 부모로 금액 전달
    emit('close');
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
}
input {
  padding: 8px;
  width: 200px;
  margin: 10px 0;
}
.btn-group button {
  margin: 5px;
  padding: 8px 16px;
}
</style>
