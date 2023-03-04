<template>
  <div>
    <div class="flex flex-col gap-5">
      <h1 class="text-lg text-tertiary">{{ title }} - {{ todos.length }}</h1>
      <ul class="flex flex-col gap-4">
        <li v-for="todo in todos.slice(0, maxItemsLength)" :key="todo.id">
          <TodoListItem
            :todo="todo"
            @on-action="(action) => $emit('on-action', todo, action)"
          />
        </li>
      </ul>
    </div>
    <nuxt-link
      v-if="todos.length > maxItemsLength"
      :to="showAllUrl"
      class="mt-2 block"
    >
      <span
        class="cursor-pointer text-sm font-light tracking-widest text-tertiary underline underline-offset-4"
      >
        View all
      </span>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoListItem from './TodoListItem.vue'
import { Todo } from '~/@types'

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
    showAllUrl: {
      type: String,
      required: true,
    },
    maxItems: {
      type: Number,
      required: false,
      default: 3,
    },
  },
  computed: {
    maxItemsLength() {
      if (this.maxItems === 0) {
        return this.todos.length
      }
      return this.maxItems
    },
  },
})
</script>
