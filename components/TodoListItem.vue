<template>
  <div
    class="h-15 box-border w-full rounded-2xl bg-secondary py-2 pl-4 pr-10"
    :class="isPastDue ? 'border-2 border-red-500' : ''"
  >
    <div
      class="flex flex-row gap-4 text-tertiary"
      :class="todo.completed || isPastDue ? 'opacity-50' : ''"
    >
      <CheckBox
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          {{ endAtText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import CheckBox from './Checkbox.vue'

export interface Todo {
  id: number
  title: string
  completed: boolean
  endAt: Date
}

export default Vue.extend({
  name: 'TodoListItem',
  components: { CheckBox },
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
  },
})
</script>
