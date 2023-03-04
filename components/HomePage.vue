<template>
  <div
    class="mx-auto box-border flex max-w-4xl flex-col justify-center gap-5 p-5"
  >
    <AddTaskButton class="mb-5" @on-click="handleAddTask" />
    <TodoList
      title="Todo"
      :todos="uncompletedTasks"
      :show-all-url="'/pending'"
      @on-action="handleAction"
    />
    <TodoList
      title="Completed"
      :todos="completedTasks"
      :show-all-url="'/completed'"
      @on-action="handleAction"
    />
    <portal to="modal">
      <ModalTransition>
        <Backdrop v-if="isModalOpen" @escape="handleCancel">
          <div v-if="modalType === 'upsert'" class="box-border w-[29rem] p-4">
            <UpsertTodoModal
              class="rounded-2xl"
              :modal-props="modalProps"
              @ok="handleOk"
              @cancel="handleCancel"
            />
          </div>
          <div
            v-if="modalType === 'delete'"
            class="box-border h-[10rem] w-[25rem] p-4"
          >
            <DeleteTodoModal
              class="rounded-2xl"
              :modal-props="modalProps"
              @ok="handleDelete"
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
import { IDelModalProps, IModalProps, Todo } from '../@types'

import {
  Backdrop,
  DeleteTodoModal,
  ModalTransition,
  UpsertTodoModal,
} from './modals'
import { TodoList } from './todo'
import AddTaskButton from './AddTaskButton.vue'
import { getNthDate, sortByTime } from '~/utils/index'

export default Vue.extend({
  name: 'HomePage',
  components: {
    TodoList,
    AddTaskButton,
    UpsertTodoModal,
    Backdrop,
    ModalTransition,
    DeleteTodoModal,
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
      } as IModalProps,
      delModalProps: {} as IDelModalProps,
      modalType: 'upsert',
    }
  },
  computed: {
    completedTasks(): Todo[] {
      return this.tasks.filter((task) => task.completed).sort(sortByTime)
    },
    uncompletedTasks(): Todo[] {
      return this.tasks.filter((task) => !task.completed).sort(sortByTime)
    },
  },
  methods: {
    handleAddTask() {
      this.modalType = 'upsert'
      this.modalProps = {
        labelOk: 'Add',
        labelCancel: 'Cancel',
      }
      this.isModalOpen = true
    },
    handleOk(todo: Todo) {
      debugger
      const text = todo.title
      this.isModalOpen = false
      if (!text) return
      if (this.modalProps.labelOk === 'Save') {
        const task = this.tasks.find(
          (task) => task.title === this.modalProps.todo?.title
        )
        if (task) {
          task.title = text
          task.endAt = todo.endAt
          return
        }
      }
      this.tasks.push({
        ...todo,
        id: this.tasks.length,
      })
    },
    handleCancel() {
      this.isModalOpen = false
    },
    handleAction(todo: Todo, action: string) {
      if (action === 'edit') {
        this.isModalOpen = true
        this.modalType = 'upsert'
        this.modalProps = {
          labelOk: 'Save',
          labelCancel: 'Cancel',
          todo,
        }
      } else if (action === 'delete') {
        this.modalType = 'delete'
        this.delModalProps.todo = todo
        this.isModalOpen = true
      }
    },
    handleDelete() {
      this.handleCancel()
      const todoToDelete = this.delModalProps.todo
      if (!todoToDelete) return
      this.delModalProps = {} as IDelModalProps
      this.tasks = this.tasks.filter((task) => task.id !== todoToDelete.id)
    },
  },
})
</script>
