<template>
  <BaseModal :modal-props="modalProps" @ok="handleOk" @cancel="handleCancel">
    <div class="h-12 w-full flex-[0.8]">
      <textarea
        id="td-text"
        v-model="initValue"
        class="h-full w-full resize-none rounded-2xl bg-secondary p-4 text-lg font-light tracking-widest text-tertiary placeholder-tertiary placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Whats on your mind ?"
        :class="{
          'outline-none ring-2 ring-red-500': isInputEmpty,
        }"
        @input="isInputEmpty = false"
        @keydown.enter="onEnter"
      />
      <span v-if="isInputEmpty" class="text-sm text-red-500">
        Please enter a valid todo
      </span>
    </div>
    <div class="flex flex-col justify-center gap-2">
      <span class="font-light tracking-widest text-tertiary">End at</span>
      <div class="h-16 w-full flex-1">
        <DatePicker
          :value="endAtDt"
          class="sm:flex-1"
          :min="minDate"
          @input="endAtDt = $event"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { IModalProps } from '../../@types'
import { BaseModal } from './'
import { DatePicker } from '~/components/base'

export default Vue.extend({
  name: 'UpsertTodoModal',
  components: { BaseModal, DatePicker },
  props: {
    modalProps: {
      type: Object as () => IModalProps,
      default: () =>
        ({
          labelOk: 'Ok',
          labelCancel: 'Cancel',
        } as IModalProps),
    },
  },
  data: function () {
    return {
      isInputEmpty: false,
      isDateEmpty: false,
      initValue: this.modalProps.todo?.title || '',
      endAtDt: this.modalProps.todo?.endAt || new Date(),
    }
  },
  computed: {
    minDate() {
      return moment().format('YYYY-MM-DD')
    },
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
      }
      if (!this.endAtDt) {
        this.isDateEmpty = true
      }
      if (this.isInputEmpty || this.isDateEmpty) return
      // emit new todo obj
      this.$emit('ok', {
        ...this.modalProps.todo,
        title: text,
        endAt: this.endAtDt,
      })
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
