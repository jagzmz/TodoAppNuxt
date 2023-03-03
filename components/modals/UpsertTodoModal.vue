<template>
  <BaseModal :modal-props="modalProps" @ok="handleOk" @cancel="handleCancel">
    <textarea
      id="td-text"
      v-model="initValue"
      class="h-12 w-full flex-[0.6] resize-none rounded-2xl bg-secondary p-4 text-lg font-light tracking-widest text-tertiary placeholder-tertiary placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder="Whats on your mind ?"
      :class="{
        'outline-none ring-2 ring-red-500': isInputEmpty,
      }"
      autofocus
      @input="isInputEmpty = false"
      @keydown.enter="onEnter"
    />
  </BaseModal>
</template>

<script lang="ts">
import Vue from 'vue'
import { BaseModal } from './'

interface IModalProps {
  labelOk: String
  labelCancel: String
  initialText?: String
}

export default Vue.extend({
  name: 'UpsertTodoModal',
  components: { BaseModal },
  props: {
    modalProps: {
      type: Object as () => IModalProps,
      default: () => ({
        labelOk: 'Ok',
        labelCancel: 'Cancel',
        initialText: '',
      }),
    },
  },
  data: function () {
    return {
      isInputEmpty: false,
      initValue: this.modalProps.initialText,
    }
  },
  mounted() {
    const todoInputEl = this.$el.querySelector(
      '#td-text'
    ) as HTMLTextAreaElement
    if (!todoInputEl) return
    todoInputEl?.focus()
  },
  methods: {
    handleOk() {
      const todoInputEl = this.$el.querySelector('#td-text')
      const text = (todoInputEl as HTMLTextAreaElement).value.trim()
      if (!text) {
        this.isInputEmpty = true
        return
      }
      this.$emit('ok', text)
    },
    handleCancel() {
      this.$emit('cancel')
    },
    onEnter(e: KeyboardEvent) {
      // ignore if shift + enter
      if (e.shiftKey) return
      e.preventDefault()
      this.handleOk()
    },
  },
})
</script>
