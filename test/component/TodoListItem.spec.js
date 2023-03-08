import { shallowMount } from '@vue/test-utils'
import { TodoListItem } from '@/components/todo'

const mockTodo = {
  completed: false,
  id: 1,
  title: 'Todo 1',
  endAt: new Date(),
}

const testIds = {
  deleteAction: 'delete-action',
  editAction: 'edit-action',
  duplicateAction: 'duplicate-action',
  todoItemTitle: 'todo-item-title',
}

describe('TodoListItem', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TodoListItem, {
      propsData: {
        todo: mockTodo,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders TodoListItem', () => {
    const wrapper = shallowMount(TodoListItem, {
      propsData: {
        todo: mockTodo,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders TodoListItem with correct title', () => {
    const title = wrapper.find(`[data-testid="${testIds.todoItemTitle}"]`)
    expect(title.text()).toBe(mockTodo.title)
  })

  it('renders TodoListItem with correct actions', () => {
    const deleteAction = wrapper.find(`[data-testid="${testIds.deleteAction}"]`)
    const editAction = wrapper.find(`[data-testid="${testIds.editAction}"]`)
    const duplicateAction = wrapper.find(
      `[data-testid="${testIds.duplicateAction}"]`
    )
    expect(deleteAction.exists()).toBe(true)
    expect(editAction.exists()).toBe(true)
    expect(duplicateAction.exists()).toBe(true)
  })

  it.each([
    ['deleteAction', 'delete'],
    ['editAction', 'edit'],
    ['duplicateAction', 'duplicate'],
  ])('emits %s event when %s action is clicked', async (action, actionName) => {
    const actionElement = wrapper.find(`[data-testid="${testIds[action]}"]`)
    actionElement.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('on-action')).toBeTruthy()
    expect(wrapper.emitted('on-action')[0][0]).toBe(actionName)
  })
})
