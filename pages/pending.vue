<template>
  <Index view="pending" />
</template>

<script lang="ts">
import Vue from 'vue'
import Index from './index.vue'

export default Vue.extend({
  name: 'Pending',
  components: { Index },
})
</script>
