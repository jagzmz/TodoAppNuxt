<template>
  <div>
    <div class="flex flex-col gap-5">
      <h1 class="ml-4 text-lg text-tertiary">
        {{ title }} - {{ todos.length }}
      </h1>
      <ul class="flex flex-col gap-4">
        <li v-for="todo in todos" :key="todo.id">
          <TodoListItem :todo="todo" @on-checked="onChecked" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import TodoListItem, { Todo } from './TodoListItem.vue'

export default Vue.extend({
  name: 'TodoList',
  components: { TodoListItem },
  props: {
    title: {
      type: String,
      required: true,
      default: 'Tasks',
    },
    todos: {
      type: Array as () => Todo[],
      required: true,
      default: () => [],
    },
  },
  methods: {
    onChecked(id: number): void {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})
</script>
