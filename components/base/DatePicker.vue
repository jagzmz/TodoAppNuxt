<template>
  <input
    type="date"
    class="date-picker h-10 w-full rounded-md bg-secondary px-4 text-tertiary"
    :value="date"
    date-format="yyyy-MM-dd"
    @input="onInput"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  name: 'DatePicker',
  props: {
    value: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      date: moment(this.value).format('YYYY-MM-DD'),
    }
  },
  methods: {
    onInput(e: Event) {
      const target = e.target as HTMLInputElement
      this.date = target.value
      this.$emit('input', new Date(target.value))
    },
  },
})
</script>

<style scoped>
input[type='date']::-webkit-inner-spin-button,
input[type='date']::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
