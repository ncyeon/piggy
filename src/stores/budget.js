import { defineStore } from 'pinia';
import axios from 'axios';

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budget: [],
    goalAmount: 100000,
  }),
  actions: {
    async fetchBudget() {
      try {
        const res = await axios.get('http://localhost:3000/budget');
        const goalRes = await axios.get('http://localhost:3000/goals');

        this.budget = res.data;
        this.goalAmount = goalRes.data?.[0]?.amount || 300000;

        this.currentAmount = this.budget
          .filter((item) => item.type === 'expense' && item.category === '저축')
          .reduce((sum, item) => sum + item.amount, 0);
      } catch (e) {
        console.error('데이터 불러오기 실패:', e);
      }
    },
  },
});
