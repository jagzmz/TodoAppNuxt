<template>
  <div class="min-h-screen bg-primary">
    <SiteHeader />
    <div
      class="mx-auto box-border flex max-w-4xl flex-col justify-center gap-5 p-5"
    >
      <TodoList
        title="Completed"
        :todos="completedTasks"
        @on-action="handleAction"
      />
      <portal-target name="modal" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SiteHeader } from '../components'
import { TodoList } from '../components/todo'

export default Vue.extend({
  name: 'IndexPage',
  components: { SiteHeader, TodoList },
})
</script>
