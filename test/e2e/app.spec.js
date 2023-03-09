import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PortalVue, { Wormhole } from 'portal-vue'
import Index from '../../pages/index.vue'
import pendingVue from '../../pages/pending.vue'
import completedVue from '../../pages/completed.vue'
import {
  mutations as _mutations,
  actions as _actions,
  getters as _getters,
} from '../../store/todos'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(PortalVue)
Wormhole.trackInstances = false

describe('Index', () => {
  let wrapper, store, actions, getters, state, mutations
  beforeEach(() => {
    state = [
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
    ]

    getters = {
      getCompletedTodos: jest.spyOn(_getters, 'getCompletedTodos'),
      getUncompletedTodos: jest.spyOn(_getters, 'getUncompletedTodos'),
    }

    mutations = {
      // _mutations.add
      add: jest.spyOn(_mutations, 'add'),
      update: jest.spyOn(_mutations, 'update'),
      delete: jest.spyOn(_mutations, 'delete'),
      toggle: jest.spyOn(_mutations, 'toggle'),
    }

    actions = {
      add: jest.spyOn(_actions, 'add'),
      delete: jest.spyOn(_actions, 'delete'),
      toggle: jest.spyOn(_actions, 'toggle'),
      update: jest.spyOn(_actions, 'update'),
      duplicate: jest.spyOn(_actions, 'duplicate'),
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
    const todoItemId = state.map((todo) => `todo-item-${todo.id}`)
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

    // expect todo-list-title to be Todo - 2, since we added a incomplete todo
    const todoListTitle = wrapper.find(`[data-testid="todo-list-title"]`)
    expect(todoListTitle.text()).toBe('Todo - 2')
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

    // expect todo-list-title to be Todo - 0, since we deleted a incomplete todo
    const todoListTitle = wrapper.find(`[data-testid="todo-list-title"]`)
    expect(todoListTitle.text()).toBe('Todo - 0')
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

    // expect todo-list-title to be Todo - 0, since we toggled a incomplete todo
    const todoListTitle = wrapper.find(`[data-testid="todo-list-title"]`)
    expect(todoListTitle.text()).toBe('Todo - 0')

    const completedTodoList = wrapper.find(`#completed-todo-list`)
    expect(completedTodoList.exists()).toBe(true)
    const completedTodoListTitle = completedTodoList.find(
      `[data-testid="todo-list-title"]`
    )
    expect(completedTodoListTitle.text()).toBe('Completed - 2')
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

    // expect todo-list-title to be Todo - 2, since we duplicated a incomplete todo
    const todoListTitle = wrapper.find(`[data-testid="todo-list-title"]`)
    expect(todoListTitle.text()).toBe('Todo - 2')
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
