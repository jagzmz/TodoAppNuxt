<template>
  <div class="min-h-screen bg-primary">
    <SiteHeader />
    <div
      class="mx-auto box-border flex max-w-4xl flex-col justify-center gap-5 p-5"
    >
      <AddTaskButton class="mb-5" @on-click="handleAddTask" />
      <TodoList
        title="Todo"
        :todos="uncompletedTasks"
        :show-all-url="'/pending'"
        @on-action="handleAction"
      />
      <portal-target name="modal" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SiteHeader, AddTaskButton } from '../components'
import { TodoList } from '../components/todo'

export default Vue.extend({
  name: 'Pending',
  components: { SiteHeader, TodoList, AddTaskButton },
})
</script>
