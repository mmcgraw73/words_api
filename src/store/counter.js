import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// export const useCounterStore = defineStore('counter', {
//   state: () => ({
//     count: 0
//   }),
//   getters: {
//     double: state => state.count * 2
//   },
//   actions: {
//     increment() {
//       this.count++;
//     }
//   }
// });

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return { count, double, increment };
});
