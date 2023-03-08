import { shallowMount, mount } from '@vue/test-utils'
import { UpsertTodoModal } from '../../components/modals'

describe('UpsertTodoModal', () => {
  const textAreaId = 'td-text'
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(UpsertTodoModal)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the BaseModal component', () => {
    expect(wrapper.find('BaseModal-stub').exists()).toBe(true)
  })

  it('renders the text area', () => {
    expect(wrapper.find(`#${textAreaId}`).exists()).toBe(true)
  })

  it('renders the text on text area on input', () => {
    const text = 'test'
    wrapper.find(`#${textAreaId}`).setValue(text)
    expect(wrapper.find(`#${textAreaId}`).element.value).toBe(text)
  })

  it('gives error if text is empty', async () => {
    wrapper = mount(UpsertTodoModal)
    const inpErrDataTestId = 'todo-input-error'
    const okBtnId = 'ok-button'
    expect(wrapper.find(`[data-testid="${inpErrDataTestId}"]`).exists()).toBe(
      false
    )
    wrapper.find(`#${textAreaId}`).setValue('')
    wrapper.find(`[data-testid="${okBtnId}"]`).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(`[data-testid="${inpErrDataTestId}"]`).exists()).toBe(
      true
    )
  })

  it('emits ok event on click of ok button with title and endAt', async () => {
    const mockProps = {
      title: 'test',
      endAt: new Date(),
    }
    wrapper = mount(UpsertTodoModal, {
      propsData: {
        modalProps: {
          todo: mockProps,
        },
      },
    })
    const okBtnId = 'ok-button'
    wrapper.find(`[data-testid="${okBtnId}"]`).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().ok).toBeTruthy()
    expect(wrapper.emitted().ok[0][0]).toEqual(mockProps)
  })

  it('emits cancel event on click of cancel button', async () => {
    const cancelBtnId = 'cancel-button'
    wrapper = mount(UpsertTodoModal)
    wrapper.find(`[data-testid="${cancelBtnId}"]`).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().cancel).toBeTruthy()
  })
})
