<template>
  <button
    class="min-w-[100px] rounded-full bg-secondary px-2 py-1 text-sm font-light tracking-widest text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Button',
})
</script>
