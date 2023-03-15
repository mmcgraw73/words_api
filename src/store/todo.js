import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    filter: 'all',
    nextId: 0,
    newTodo: ''
  }),
  getters: {
    filter() {
      return 'all';
    },
    finishedList(state) {
      return state.list.filter(item => item.isFinished);
    },
    unfinishedList(state) {
      return state.list.filter(item => !item.isFinished);
    },
    filteredList(state) {
      switch (state.filter) {
        case 'finished':
          return state.finishedList;
        case 'unfinished':
          return state.unfinishedList;
        case 'all':
          return state.list;
        default:
          console.error('沒有此狀態');
      }
    }
  },
  actions: {
    addTodo(text) {
      const newItem = this.getInitTodo(text);
      this.list.push(newItem);
    },
    getInitTodo(text) {
      return {
        id: ++this.nextId,
        text,
        isFinished: false
      };
    },
    async fetchTodo() {
      const newItem = this.getInitTodo('fetch new todo');
      this.list.push(newItem);
      return this.list;
      // throw 1;
    }
  }
});
