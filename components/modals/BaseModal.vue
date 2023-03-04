<template>
  <div
    class="flex h-full w-full flex-col justify-between gap-3 bg-primary p-4 px-6"
  >
    <slot />
    <div class="mt-4 flex h-12 justify-center gap-5">
      <ButtonBase
        class="w-1/2 border-2 border-red-500 selection:bg-red-500"
        @click="$emit('cancel')"
      >
        {{ modalProps.labelCancel }}</ButtonBase
      >
      <ButtonBase class="w-1/2" @click="$emit('ok')">
        {{ modalProps.labelOk }}</ButtonBase
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ButtonBase } from '../base'

export default Vue.extend({
  name: 'BaseModal',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { ButtonBase },
  props: {
    modalProps: {
      type: Object,
      required: true,
      default: () => ({
        labelOk: 'Ok',
        labelCancel: 'Cancel',
      }),
    },
  },
})
</script>
