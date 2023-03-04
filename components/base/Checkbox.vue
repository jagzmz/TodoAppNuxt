<template>
  <div
    class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg border-2 border-quaternary"
    :class="isChecked ? 'bg-quaternary' : 'bg-transparent'"
    @click="$emit('on-checked')"
  >
    <CheckMarkLogo v-if="isChecked" class="h-[15px] w-[15px] text-primary" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CheckMarkLogo from '~/assets/icons/checkmark.svg?inline'

export default Vue.extend({
  name: 'Checkbox',
  components: { CheckMarkLogo },
  props: {
    isChecked: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
