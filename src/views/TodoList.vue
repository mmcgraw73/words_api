<template>
  <div class="d-flex gap-5">
    <div class="todo-list">
      <button type="button" class="btn danger" @click="todo.$reset()">
        reset Todo
      </button>
      <button type="button" class="btn primary" @click="todo.fetchTodo(1, 2, 3)">
        fetch Todo
      </button>
      <div class="mt-5">
        <input type="text" v-model="newText" />
        <button
          type="button"
          class="btn primary"
          :disabled="newText.trim().length === 0"
          @click="todo.addTodo(newText)"
        >
          add Todo
        </button>
      </div>
      <List
        class="mt-5"
        v-model="todo.list"
        :initItem="() => todo.getInitTodo(newText)"
        v-slot="{ item }"
      >
        <div>
          <input type="checkbox" v-model="item.isFinished" />
          <span class="ml-2">{{ item.text }}</span>
        </div>
      </List>

      <!-- <ul class="list-group mt-3">
        <li
          class="list-group-item"
          v-for="item in todo.filteredList"
          :key="item.id"
        >
          <input type="checkbox" v-model="item.isFinished" />
          <span class="ml-2">{{ item.text }}</span>
        </li>
      </ul> -->
    </div>
    <div>
      <pre>filter: {{ filter }}</pre>
      <pre>filteredList: {{ filteredList }}</pre>
      <pre>todo: {{ todo }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/store/todo';

import List from '@/components/List.vue';

const todo = useTodoStore();
console.log(todo);
const { filteredList, filter } = storeToRefs(todo);
const newText = ref('');

// todo.$subscribe((mutation, state) => {
//   console.log(mutation);
//   console.log(state);
// });

todo.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError // hook if the action throws or rejects
  }) => {
    // a shared variable for this specific action call
    const startTime = Date.now();
    // this will trigger before an action on `store` is executed
    console.log(`Start "${name}" with params [${args.join(', ')}].`);
    console.log(store);

    // this will trigger if the action succeeds and after it has fully run.
    // it waits for any returned promised
    after(result => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      );
      return 1;
    });

    // this will trigger if the action throws or returns a promise that rejects
    onError(error => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      );
    });
  }
);

const res = todo.fetchTodo(1, 2, 3);
console.log(res);
</script>

<style lang="scss" scoped>
.list-group {
  display: flex;
  flex-direction: column;

  padding-left: 0;
  margin-bottom: 0;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border: 1px solid;

  & + & {
    border-top-width: 0;
  }
}
</style>
