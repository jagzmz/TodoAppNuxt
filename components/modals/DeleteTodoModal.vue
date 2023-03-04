<template>
  <BaseModal
    :modal-props="modalProps"
    @ok="$emit('ok')"
    @cancel="$emit('cancel')"
  >
    <h1 class="text-center text-2xl text-tertiary">Delete this Todo ?</h1>
  </BaseModal>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseModal from './BaseModal.vue'

export default Vue.extend({
  name: 'DeleteTodoModal',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { BaseModal },
  data: function () {
    return {
      modalProps: {
        labelOk: 'Ok',
        labelCancel: 'Cancel',
      },
    }
  },
})
</script>
