<template>
  <div class="min-h-screen bg-primary">
    <SiteHeader />
    <HomePage :name="'Index Page'" />
    <portal-target name="modal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HomePage from '../components/HomePage.vue'
import SiteHeader from '../components/SiteHeader.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { HomePage, SiteHeader },
})
</script>
