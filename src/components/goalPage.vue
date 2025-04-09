<template>
  <div class="goal-box">
    <h2><b>저축 목표</b></h2>
    <br />
    <div class="mb-3 fw-bold">
      목표 금액: {{ goalAmount.toLocaleString() }}원
    </div>
    <div class="progress mb-3">
      <div
        class="progress-bar bg-success"
        role="progressbar"
        :style="{ width: '100%' }"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <div class="mb-2 fw-bold">
      현재 금액: {{ currentAmount.toLocaleString() }}원
    </div>
    <div class="progress mb-3">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: animatedPercentage + '%', backgroundColor: '#42a5f5' }"
        :aria-valuenow="animatedPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <div class="h4 fw-bold" style="font-family: 'Pretendard', sans-serif">
      {{ Math.floor(animatedPercentage) }}%
    </div>

    <img
      :src="pigImage"
      alt="Piggy"
      class="pig-img"
      @click="isModalVisible = true"
    />

    <div v-if="showMessage" class="alert-message">
      {{ messageText }}
    </div>

    <!-- 모달 -->
    <SavingModal
      :show="isModalVisible"
      :savings="savingsHistory"
      @close="isModalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useBudgetStore } from '@/stores/budget.js';
import SavingModal from '@/components/SavingModal.vue';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const store = useBudgetStore();
const currentAmount = ref(0);
const goalAmount = ref(500000);
// --> 이게 반영이 되는게 아님,, 그럼 어디서 ?...

const animatedPercentage = ref(0);

const showMessage = ref(false);
const messageText = ref('');

const isModalVisible = ref(false); // 모달 표시 여부
const savingsHistory = computed(() =>
  store.budget.filter(
    (item) => item.type === 'expense' && item.category === '저축'
  )
);

const percentage = computed(() => {
  if (goalAmount.value === 0) return 0;
  return Math.min((currentAmount.value / goalAmount.value) * 100, 100);
});

const pigImage = computed(() => {
  const percent = animatedPercentage.value;
  if (percent < 25) return 'src/assets/images/poor_pig.png';
  if (percent < 50) return 'src/assets/images/pig.svg';
  if (percent < 75) return 'src/assets/images/over_goal_pig.png';
  return 'src/assets/images/rich_pig.png';
});

const calculateSavings = () => {
  const savings = savingsHistory.value.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  currentAmount.value = savings;
};

const animatePercentage = () => {
  const target = percentage.value;
  animatedPercentage.value = 0;
  const step = target / 10;

  const interval = setInterval(() => {
    if (animatedPercentage.value < target) {
      animatedPercentage.value = Math.min(
        animatedPercentage.value + step,
        target
      );
    } else {
      clearInterval(interval);

      messageText.value = `${Math.floor(target)}%를 달성했어요!`;
      showMessage.value = true;

      setTimeout(() => {
        showMessage.value = false;
      }, 2000);
    }
  }, 16);
};

onMounted(async () => {
  const response = await fetch('/mydata.json');
  const mydata = await response.json();

  await store.fetchBudget(); // axios로 json-server 불러옴
  goalAmount.value = store.goalAmount;
  // console.log('goalAmount:', goalAmount.value);
  mydata.forEach((item) => {
    if (item.type === 'expense' && item.category === '저축') {
      store.budget.push(item);
    }
  });

  calculateSavings();
  // console.log('currentAmount:', currentAmount.value);
  // console.log('percentage:', percentage.value);
  animatePercentage();
});
</script>

<style scoped>
.progress {
  height: 20px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
}
.progress-bar {
  transition: width 0.6s ease-in-out;
}
.pig-img {
  width: 250px;
  margin-top: 20px;
  transition: transform 0.3s ease-in-out;
}
.pig-img:hover {
  transform: scale(1.1);
}
.goal-box {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.alert-message {
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 10px 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-weight: bold;
  font-size: 1rem;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
