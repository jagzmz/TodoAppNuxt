<template>
  <index view="completed" />
</template>

<script lang="ts">
import Vue from 'vue'
import Index from './index.vue'

export default Vue.extend({
  name: 'Completed',
  components: { Index },
})
</script>
