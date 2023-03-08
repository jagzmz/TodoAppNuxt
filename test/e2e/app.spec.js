import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PortalVue from 'portal-vue'
import Index from '../../pages/index.vue'
import pendingVue from '../../pages/pending.vue'
import completedVue from '../../pages/completed.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(PortalVue)

describe('Index', () => {
  let wrapper, store, actions, getters, state, mutations
  beforeEach(() => {
    state = {
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
          completed: true,
          endAt: new Date(),
        },
      ],
    }

    getters = {
      getCompletedTodos: (state) =>
        state.todos.filter((todo) => todo.completed),
      getUncompletedTodos: (state) =>
        state.todos.filter((todo) => !todo.completed),
    }

    mutations = {
      add: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      toggle: jest.fn(),
    }

    actions = {
      add: jest.fn(),
      delete: jest.fn(),
      toggle: jest.fn(),
      update: jest.fn(),
      duplicate: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        todos: {
          state,
          getters,
          mutations,
          actions,
          namespaced: true,
        },
      },
    })

    wrapper = mount(Index, {
      stubs: ['nuxt-link'],
      mocks: {
        $route: {
          path: '/',
        },
      },
      store,
      localVue,
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders Index', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders todos', () => {
    const todoItemId = state.todos.map((todo) => `todo-item-${todo.id}`)
    todoItemId.forEach((id) => {
      const todoItem = wrapper.find(`[data-testid="${id}"]`)
      expect(todoItem.exists()).toBe(true)
    })
  })

  it('should add a todo', async () => {
    // click on AddTaskButton
    const addComponent = wrapper.findComponent({
      name: 'AddTaskButton',
    })
    addComponent.trigger('click')
    await wrapper.vm.$nextTick()
    const tAreaId = 'td-text'
    const tArea = wrapper.find(`#${tAreaId}`)
    expect(tArea.exists()).toBe(true)

    // type in textarea
    tArea.setValue('Todo 3')
    await wrapper.vm.$nextTick()
    // click on ok-button on base-modal
    const baseModal = wrapper.findComponent({
      name: 'BaseModal',
    })
    const btnId = 'ok-button'
    const okBtn = baseModal.find(`[data-testid="${btnId}"]`)
    okBtn.trigger('click')
    await wrapper.vm.$nextTick()

    // check if add action is called Todo Object
    expect(actions.add).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        todo: expect.objectContaining({
          title: 'Todo 3',
        }),
      })
    )
  })

  it('should delete a todo', async () => {
    const todoId = 1
    // click on delete action
    const todoItem = wrapper.find(`[data-testid="todo-item-${todoId}"]`)
    const deleteAction = todoItem.find(`[data-testid="delete-action"]`)
    deleteAction.trigger('click')
    await wrapper.vm.$nextTick()
    // click on ok-button on base-modal
    const baseModal = wrapper.findComponent({
      name: 'BaseModal',
    })
    const btnId = 'ok-button'
    const okBtn = baseModal.find(`[data-testid="${btnId}"]`)
    okBtn.trigger('click')
    await wrapper.vm.$nextTick()

    // check if delete action is called with id
    expect(actions.delete).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        todoId,
      })
    )
  })

  it('should toggle a todo', async () => {
    const todoId = 1
    // click on toggle action
    const todoItem = wrapper.find(`[data-testid="todo-item-${todoId}"]`)
    const toggleAction = todoItem.find(`[data-testid="checkbox"]`)
    toggleAction.trigger('click')
    await wrapper.vm.$nextTick()

    // check if toggle action is called with id
    expect(actions.toggle).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        todoId,
      })
    )
  })

  it('should update a todo', async () => {
    const todoId = 1
    // click on edit action
    const todoItem = wrapper.find(`[data-testid="todo-item-${todoId}"]`)
    const editAction = todoItem.find(`[data-testid="edit-action"]`)
    editAction.trigger('click')
    await wrapper.vm.$nextTick()
    // click on ok-button on base-modal
    const baseModal = wrapper.findComponent({
      name: 'BaseModal',
    })
    // change text in textarea
    const tAreaId = 'td-text'
    const tArea = baseModal.find(`#${tAreaId}`)
    const newTitle = 'Todo 1 updated test'
    tArea.setValue(newTitle)
    await wrapper.vm.$nextTick()
    const btnId = 'ok-button'
    const okBtn = baseModal.find(`[data-testid="${btnId}"]`)
    okBtn.trigger('click')
    await wrapper.vm.$nextTick()

    // check if update action is called with id
    expect(actions.update).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        todoId,
        todo: expect.objectContaining({
          title: newTitle,
        }),
      })
    )
  })

  it('should duplicate a todo', async () => {
    const todoId = 1
    // click on duplicate action
    const todoItem = wrapper.find(`[data-testid="todo-item-${todoId}"]`)
    const duplicateAction = todoItem.find(`[data-testid="duplicate-action"]`)
    duplicateAction.trigger('click')
    await wrapper.vm.$nextTick()

    // check if duplicate action is called with id
    expect(actions.duplicate).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        todoId,
      })
    )
  })

  it('should render completed todos', () => {
    wrapper = mount(pendingVue, {
      stubs: ['nuxt-link'],
      mocks: {
        $route: {
          path: '/pending',
        },
      },
      store,
      localVue,
    })
    const IndexComponent = wrapper.findComponent({
      name: 'IndexPage',
    })
    expect(IndexComponent.exists()).toBe(true)
    expect(IndexComponent.vm.pendingTodoListProps.maxItems).toBe(0)
  })

  it('should render pending todos', () => {
    wrapper = mount(completedVue, {
      stubs: ['nuxt-link'],
      mocks: {
        $route: {
          path: '/completed',
        },
      },
      store,
      localVue,
    })
    const IndexComponent = wrapper.findComponent({
      name: 'IndexPage',
    })
    expect(IndexComponent.exists()).toBe(true)
    expect(IndexComponent.vm.completedTodoListProps.maxItems).toBe(0)
  })
})
