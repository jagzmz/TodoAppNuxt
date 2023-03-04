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

import { TodoAction } from '../store/todos'
import {
  Backdrop,
  DeleteTodoModal,
  ModalTransition,
  UpsertTodoModal,
} from './modals'
import { TodoList } from './todo'
import AddTaskButton from './AddTaskButton.vue'

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
    tasks(): Todo[] {
      return this.$store.state.todos
    },
    completedTasks(): Todo[] {
      return this.$store.getters['todos/getCompletedTodos']
    },
    uncompletedTasks(): Todo[] {
      return this.$store.getters['todos/getUncompletedTodos']
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
      const text = todo.title
      this.isModalOpen = false
      if (!text) return
      // FIXME: use identifier or enum for comparison
      if (this.modalProps.labelOk === 'Save') {
        this.$store.dispatch<TodoAction>({
          type: 'todos/update',
          todo,
          todoId: todo.id,
        })
        return
      }
      this.$store.dispatch<TodoAction>({
        type: 'todos/add',
        todo: {
          title: text,
          endAt: todo.endAt,
        },
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
      } else if (action === 'toggle') {
        this.$store.dispatch<TodoAction>({
          type: 'todos/toggle',
          todoId: todo.id,
        })
      }
    },
    handleDelete() {
      this.handleCancel()
      const todoToDelete = this.delModalProps.todo
      this.$store.dispatch<TodoAction>({
        type: 'todos/delete',
        todoId: todoToDelete.id,
      })
    },
  },
})
</script>
