<template>
  <div class="p-8">
    <h1
      class="mx-auto w-max select-none font-Pacifico text-4xl tracking-widest text-quaternary"
    >
      {{ title }}
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SiteHeader',
  data() {
    return {
      title: 'Todo',
    }
  },
})
</script>
