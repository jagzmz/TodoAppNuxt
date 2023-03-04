/* State file for Todo */
import { getNthDate } from '../utils'
import { Todo } from '@/@types'

export const state = (): Todo[] => [
  {
    id: 1,
    title: `Stock for the next week`,
    completed: false,
    endAt: getNthDate(-1),
  },
  {
    id: 2,
    title: `Finish the todo list app`,
    completed: true,
    endAt: getNthDate(0),
  },
  {
    id: 3,
    // long real word todo text
    title: `Finish the essay collaboration`,
    completed: false,
    endAt: getNthDate(0),
  },
  {
    id: 4,
    title: `Master Tailwind CSS`,
    completed: false,
    endAt: getNthDate(2),
  },
  {
    id: 5,
    title: `Learn more about Nuxt.js and Vue.js about Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
       as Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.`,
    completed: false,
    endAt: getNthDate(5),
  },
]

const sortById = (a: Todo, b: Todo) => a.id - b.id

export const getters = {
  getCompletedTodos: (state: Todo[]) =>
    state.filter((todo) => todo.completed).sort(sortById),
  getUncompletedTodos: (state: Todo[]) =>
    state.filter((todo) => !todo.completed).sort(sortById),
}

export const mutations = {
  add(state: Todo[], todo: Todo) {
    state.push(todo)
  },
  update(state: Todo[], { todoIdx, todo }: { todoIdx: number; todo: Todo }) {
    Object.assign(state[todoIdx], todo)
  },
  delete(state: Todo[], todoIdx: number) {
    state.splice(todoIdx, 1)
  },
  toggle(state: Todo[], todoIdx: number) {
    state[todoIdx].completed = !state[todoIdx].completed
  },
}

type AnyObj = Record<string, any>

export const actions = {
  add({ commit }: AnyObj, { todo }: { todo: Todo }) {
    commit('add', {
      ...todo,
      id: Date.now(),
      completed: false,
    })
  },
  delete({ commit }: AnyObj, { todoId }: { todoId: number }) {
    const todoIdx = state().findIndex((todo) => todo.id === todoId)
    commit('delete', todoIdx)
  },
  toggle({ commit }: AnyObj, { todoId }: { todoId: number }) {
    const todoIdx = state().findIndex((todo) => todo.id === todoId)
    commit('toggle', todoIdx)
  },
  update({ commit }: AnyObj, { todoId, todo }: { todoId: number; todo: Todo }) {
    const todoIdx = state().findIndex((todo) => todo.id === todoId)
    commit('update', { todoIdx, todo })
  },
}

interface ActionTodoAdd {
  type: 'todos/add'
  todo: Omit<Todo, 'id' | 'completed'>
}
interface ActionTodoDelete {
  type: 'todos/delete'
  todoId: number
}
interface ActionTodoToggle {
  type: 'todos/toggle'
  todoId: number
}

interface ActionTodoUpdate {
  type: 'todos/update'
  todoId: number
  todo: Omit<Todo, 'id' | 'completed'>
}

export type TodoAction =
  | ActionTodoAdd
  | ActionTodoDelete
  | ActionTodoToggle
  | ActionTodoUpdate