<template>
  <div class="about">
    <h1>About</h1>
    <InputNumber v-model="counterStore.count" />
    <pre>counter: {{ counterStore }}</pre>
    <div class="hstack gap-3">
      <button type="button" class="btn primary" @click="counterStore.increment">
        increment action
      </button>
      <button
        type="button"
        class="btn primary"
        @click="counterStore.$patch({ count: counterStore.count + 1 })"
      >
        patch store
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { useCounterStore } from '@/store/counter';

import InputNumber from '@/components/InputNumber.vue';

export default {
  components: {
    InputNumber
  },
  mounted() {
    console.log(this);
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['count']),
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      double: store => store.count * 2,
      magicValue(store) {
        return store.double + this.count + this.double;
      }
    })
  },
  methods: {
    // gives access to this.increment() inside the component
    // same as calling from store.increment()
    ...mapActions(useCounterStore, ['increment']),
    // same as above but registers it as this.myOwnName()
    ...mapActions(useCounterStore, { myIncrement: 'increment' })
  }
};
</script>

<style lang="scss" scoped></style>
