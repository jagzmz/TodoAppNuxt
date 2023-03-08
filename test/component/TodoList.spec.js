import { shallowMount } from '@vue/test-utils'
import { TodoList } from '@/components/todo'

const mockProps = {
  title: 'Todos',
  todos: [
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
      endAt: new Date(),
    },
    {
      id: 2,
      title: 'Todo 2',
      completed: false,
      endAt: new Date(),
    },
  ],
  showAllUrl: '/todos',
  maxItems: 1,
}

describe('TodoList', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TodoList, {
      propsData: mockProps,
      stubs: ['nuxt-link'],
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders TodoList', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders TodoList with correct title', () => {
    const titleId = 'todo-list-title'
    const title = wrapper.find(`[data-testid="${titleId}"]`)
    expect(title.text()).toBe(`Todos - ${mockProps.todos.length}`)
  })

  it('renders TodoList with correct todos', () => {
    const todoListId = 'todo-list'
    const todoList = wrapper.find(`[data-testid="${todoListId}"]`)
    expect(todoList.exists()).toBe(true)
    expect(todoList.findAll('li').length).toBe(
      Math.min(mockProps.maxItems, mockProps.todos.length)
    )
    expect(todoList.findAll('TodoListItem-stub').length).toBe(
      Math.min(mockProps.maxItems, mockProps.todos.length)
    )
  })

  it('renders TodoList with correct show all link', () => {
    const showAllId = 'todo-list-show-all'
    const showAll = wrapper.find(`[data-testid="${showAllId}"]`)
    expect(showAll.exists()).toBe(true)
    // nuxt-link
    expect(showAll.attributes('to')).toBe(mockProps.showAllUrl)
  })

  it('renders TodoList without show all', () => {
    const showAllId = 'todo-list-show-all'
    wrapper = shallowMount(TodoList, {
      propsData: {
        ...mockProps,
        showAllUrl: null,
        maxItems: 10,
      },
      stubs: ['nuxt-link'],
    })
    const showAll = wrapper.find(`[data-testid="${showAllId}"]`)
    expect(showAll.exists()).toBe(false)
  })
})
