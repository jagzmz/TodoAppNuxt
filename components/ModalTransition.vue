<template>
  <transition name="modal-fade">
    <slot />
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ModalTransition',
})
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
