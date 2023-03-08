import { shallowMount } from '@vue/test-utils'
import { AddTaskButton } from '@/components'

describe('AddTaskButton', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(AddTaskButton)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('emits the "on-click" event when clicked', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted('on-click')).toBeTruthy()
  })
})
