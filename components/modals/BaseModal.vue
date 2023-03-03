<template>
  <div class="flex h-full w-full flex-col justify-between bg-primary p-4 px-6">
    <slot />
    <div class="flex justify-end gap-4">
      <Button class="border-2 border-red-500" @click="$emit('cancel')">
        {{ modalProps.labelCancel }}</Button
      >
      <Button @click="$emit('ok')"> {{ modalProps.labelOk }}</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseModal',
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
