<template>
  <div class="p-8">
    <nuxt-link to="/"
      ><h1
        data-testid="site-header-title"
        class="mx-auto w-max select-none font-Pacifico text-4xl tracking-widest text-quaternary"
      >
        {{ title }}
      </h1></nuxt-link
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SiteHeader',
  props: {
    title: {
      type: String,
      default: 'Todo',
    },
  },
})
</script>
