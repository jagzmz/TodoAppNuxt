<template>
  <div
    class="mx-auto box-border flex max-w-4xl flex-col justify-center gap-5 p-5"
  >
    <AddTask class="mb-5" @on-click="handleAddTask" />
    <TodoItemList title="Todo" :todos="uncompletedTasks" />
    <TodoItemList title="Completed" :todos="completedTasks" />
    <portal to="modal">
      <ModalTransition>
        <Backdrop v-if="isModalOpen" @escape="handleCancel">
          <div class="container mx-auto h-60 w-[28rem]">
            <UpsertTodoModal
              class="rounded-2xl"
              :label-ok="modalProps.labelOk"
              :label-cancel="modalProps.labelCancel"
              @ok="handleOk"
              @cancel="handleCancel"
            />
          </div>
        </Backdrop>
      </ModalTransition>
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import TodoItemList from './TodoList.vue'
import UpsertTodoModal from './UpsertTodoModal.vue'
import { Todo } from './TodoListItem.vue'
import AddTask from './AddTask.vue'
import Backdrop from './Backdrop.vue'
import ModalTransition from './ModalTransition.vue'

const getNthDate = (n: number) => {
  const today = moment()
  const nthDay = today.add(n, 'days')
  return nthDay.toDate()
}

export default Vue.extend({
  name: 'HomePage',
  components: {
    TodoItemList,
    AddTask,
    UpsertTodoModal,
    Backdrop,
    ModalTransition,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tasks: [
        {
          id: 0,
          // long real word todo text
          title: `Stock for the next week`,
          completed: false,
          endAt: getNthDate(-1),
        },
        {
          id: 7,
          title: `Finish the todo list app`,
          completed: true,
          endAt: getNthDate(0),
        },
        {
          id: 2,
          // long real word todo text
          title: `Finish the essay collaboration`,
          completed: false,
          endAt: getNthDate(0),
        },
        {
          id: 1,
          title: `Master Tailwind CSS`,
          completed: false,
          endAt: getNthDate(2),
        },
        {
          id: 3,
          title: `Learn more about Nuxt.js and Vue.js about Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
           as Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.`,
          completed: false,
          endAt: getNthDate(5),
        },
      ],
      isModalOpen: false,
      modalProps: {
        labelOk: 'Add',
        labelCancel: 'Cancel',
      },
    }
  },
  computed: {
    completedTasks(): Todo[] {
      return this.tasks.filter((task) => task.completed)
    },
    uncompletedTasks(): Todo[] {
      return this.tasks.filter((task) => !task.completed)
    },
  },
  methods: {
    handleAddTask() {
      this.isModalOpen = true
      this.modalProps = {
        labelOk: 'Add',
        labelCancel: 'Cancel',
      }
    },
    handleOk() {
      this.isModalOpen = false
    },
    handleCancel() {
      this.isModalOpen = false
      console.log('cancel')
    },
  },
})
</script>
