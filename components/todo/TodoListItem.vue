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
        class="mt-1 flex-shrink-0"
        @on-checked="onAction('toggle')"
      />
      <div
        class="flex w-full flex-col justify-between gap-3 overflow-hidden text-sm"
      >
        <span
          class="w-full break-words font-sans text-base font-light tracking-widest line-clamp-2"
          :class="todo.completed ? 'line-through' : ''"
          data-testid="todo-item-title"
        >
          {{ todo.title }}
        </span>
        <div
          class="flex select-none items-center gap-2"
          :style="{ color: colorOfDay }"
        >
          <CalendarIcon class="h-4 w-4" />
          {{ endAtText }}
        </div>
      </div>
      <div
        class="flex flex-grow flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <DuplicateIcon
          class="cursor-pointer"
          stroke="white"
          data-testid="duplicate-action"
          @click="onAction('duplicate')"
        />
        <EditIcon
          class="cursor-pointer"
          stroke="white"
          data-testid="edit-action"
          @click="onAction('edit')"
        />
        <TrashIcon
          class="cursor-pointer"
          stroke="rgb(239 68 68 / 1)"
          data-testid="delete-action"
          @click="onAction('delete')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { Todo } from '~/@types'
import {
  TrashIcon,
  EditIcon,
  CalendarIcon,
  DuplicateIcon,
} from '~/assets/icons/index'
import { Checkbox } from '~/components/base'

export default Vue.extend({
  name: 'TodoListItem',
  components: { Checkbox, CalendarIcon, EditIcon, TrashIcon, DuplicateIcon },
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
    onAction(action: string): void {
      console.log('onAction', action)
      this.$emit(`on-action`, action)
    },
  },
})
</script>
