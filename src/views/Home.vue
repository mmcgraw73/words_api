<template>
  <div class="home">
    <h1>Home</h1>
    <HelloWorld msg="Hi" />
    <Counter v-model:count="count" />
    <hr />
    <pre>counter: {{ counter }}</pre>
    <div class="hstack gap-3">
      <button type="button" class="btn primary" @click="counter.increment">
        increment action
      </button>
      <button
        type="button"
        class="btn primary"
        @click="counter.$patch({ count: counter.count + 1 })"
      >
        patch store
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import HelloWorld from '@/components/HelloWorld.vue';
import Counter from '@/components/Counter.vue';

import { useCounterStore } from '@/store/counter';

const counter = useCounterStore();
console.log(counter);

const count = ref(0);
</script>

<style lang="scss" scoped></style>
