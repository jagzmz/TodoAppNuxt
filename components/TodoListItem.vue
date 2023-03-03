<template>
  <div
    class="h-15 box-border w-full rounded-2xl bg-secondary py-2 pl-4 pr-4"
    :class="isPastDue ? 'border-2 border-red-500' : ''"
  >
    <div
      class="flex flex-row gap-4 text-tertiary"
      :class="todo.completed || isPastDue ? 'opacity-50' : ''"
    >
      <Checkbox
        :is-checked="todo.completed"
        :on-checked="onChecked"
        class="mt-1 flex-shrink-0"
      />
      <div class="flex flex-col gap-3 text-sm">
        <div class="w-full text-justify text-base">
          <span
            class="break-all font-sans font-light tracking-widest line-clamp-2"
            :class="todo.completed ? 'line-through' : ''"
          >
            {{ todo.title }}
          </span>
        </div>
        <div
          class="flex select-none items-center gap-2"
          :style="{ color: colorOfDay }"
        >
          <CalendarIcon class="h-4 w-4" />
          {{ endAtText }}
        </div>
      </div>
      <div class="flex flex-grow items-center justify-end gap-4 p-1">
        <EditIcon
          class="cursor-pointer"
          stroke="white"
          @click="onAction('edit')"
        />
        <TrashIcon
          class="cursor-pointer"
          stroke="rgb(239 68 68 / 1)"
          @click="onAction('delete')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { Checkbox } from './'
import { Todo } from '~/@types'
import { TrashIcon, EditIcon, CalendarIcon } from '~/assets/icons/index'

export default Vue.extend({
  name: 'TodoListItem',
  components: { Checkbox, CalendarIcon, EditIcon, TrashIcon },
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
  },
  computed: {
    endAtText(): string {
      if (this.isToday) {
        return 'Today'
      } else if (this.isTomorrow) {
        return 'Tomorrow'
      } else {
        return moment(this.todo.endAt).format('dddd, MMMM Do')
      }
    },
    isToday(): boolean {
      return moment(this.todo.endAt).isSame(moment(), 'day')
    },
    isTomorrow(): boolean {
      return moment(this.todo.endAt).isSame(moment().add(1, 'day'), 'day')
    },
    isPastDue(): boolean {
      return (
        moment(this.todo.endAt).isBefore(moment(), 'day') &&
        !this.todo.completed
      )
    },
    colorOfDay(): string {
      if (moment(this.todo.endAt).isSame(moment(), 'day')) {
        return '#D6974F'
      } else if (moment(this.todo.endAt).isBefore(moment(), 'day')) {
        return '#ffffff'
      } else {
        return '#4D9E74'
      }
    },
  },
  methods: {
    onChecked(checked: boolean): void {
      this.$emit('on-checked', this.todo.id, checked)
    },
    onAction(action: string): void {
      this.$emit(`on-action`, this.todo.id, action)
    },
  },
})
</script>
