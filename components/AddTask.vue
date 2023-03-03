<template>
  <div
    class="flex cursor-pointer select-none gap-4 rounded-xl border-2 border-[#1D1D26] p-4 text-tertiary"
    @click="onClick"
  >
    <div
      class="box-border flex h-6 w-6 items-center justify-center rounded-lg bg-quaternary p-1"
    >
      <AddIcon class="h-[15px] w-[15px] text-primary" stroke-width="2" />
    </div>
    <span class="opacity-80">Add a new task</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AddIcon from '~/assets/icons/add.svg?inline'

export default Vue.extend({
  name: 'AddTask',
  components: { AddIcon },
  methods: {
    onClick(): void {
      this.$emit('on-click')
    },
  },
})
</script>
