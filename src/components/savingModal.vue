<!-- components/SavingModal.vue -->
<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" v-if="show">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">저축 내역</h5>
          <button
            type="button"
            class="btn-close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li
              v-for="(item, index) in savings"
              :key="index"
              class="list-group-item d-flex justify-content-between"
            >
              <span>{{ item.date }}</span>
              <span>{{ item.amount.toLocaleString() }}원</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  savings: Array,
});
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
