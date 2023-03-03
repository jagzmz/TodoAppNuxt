<template>
  <div class="flex h-full w-full flex-col justify-between bg-primary p-4">
    <textarea
      id="td-text"
      class="h-12 w-full flex-[0.6] resize-none rounded-2xl bg-secondary p-4 text-lg font-light tracking-widest text-tertiary placeholder-tertiary placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder="Whats on your mind ?"
      :class="{
        'outline-none ring-2 ring-red-500': isInputEmpty,
      }"
      @input="isInputEmpty = false"
    />
    <div class="flex justify-end gap-4">
      <Button class="border-2 border-red-500" @click="handleCancel">
        {{ labelCancel }}</Button
      >
      <Button @click="handleOk"> {{ labelOk }}</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from './Button.vue'

export default Vue.extend({
  name: 'UpsertTodoModal',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Button },
  props: {
    labelOk: {
      type: String,
      default: 'Ok',
    },
    labelCancel: {
      type: String,
      default: 'Cancel',
    },
  },
  data: function () {
    return {
      isInputEmpty: false,
    }
  },
  methods: {
    handleOk() {
      const todoInputEl = this.$el.querySelector('#td-text')
      const text = (todoInputEl as HTMLTextAreaElement).value
      if (!text) {
        this.isInputEmpty = true
        return
      }
      this.$emit('ok', text)
    },
    handleCancel() {
      this.$emit('cancel')
    },
  },
})
</script>
