<template>
  <div
    class="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70"
    @keydown.esc="$emit('escape')"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Backdrop',
  mounted() {
    window.addEventListener('keydown', this.handleEscape)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscape)
  },
  methods: {
    handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      this.$emit('escape')
    },
  },
})
</script>
