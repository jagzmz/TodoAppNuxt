import { shallowMount } from '@vue/test-utils'
import { Checkbox } from '../../components/base'

describe('Checkbox', () => {
  const testId = 'checkbox'
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        isChecked: false,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should not render CheckMarkLogo component if isChecked prop is false', () => {
    expect(wrapper.findComponent({ name: 'CheckMarkLogo' }).exists()).toBe(
      false
    )
  })

  it('should render CheckMarkLogo component if isChecked prop is true', async () => {
    wrapper.setProps({
      isChecked: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'CheckMarkLogo' }).exists()).toBe(true)
  })

  it('should emit on-checked event when checkbox is clicked', async () => {
    wrapper.find(`[data-testid="${testId}"]`).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['on-checked']).toBeTruthy()
  })
})
