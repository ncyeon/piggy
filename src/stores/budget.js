import { defineStore } from 'pinia';
import axios from 'axios';

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budget: [],
    goalAmount: 0,
  }),
  actions: {
    async fetchBudget() {
      try {
        const response = await axios.get('/mydata.json');
        this.budget = response.data.filter(
          (item) => item.type === 'expense' && item.category === '저축'
        );
      } catch (e) {
        console.error('데이터 불러오기 실패:', e);
      }
    },
    setGoalAmount(amount) {
      this.goalAmount = amount;
    },
  },
});
