<template>
  <div class="p-8">
    <h1
      class="font mx-auto w-max select-none font-sans text-4xl font-normal tracking-widest text-quaternary"
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
      title: 'Todo List',
    }
  },
})
</script>
