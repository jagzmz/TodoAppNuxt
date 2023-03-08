import { shallowMount } from '@vue/test-utils'
import { ButtonBase } from '../../components/base'

describe('ButtonBase', () => {
  let wrapper
  const buttonText = 'Test button text'
  beforeEach(() => {
    wrapper = shallowMount(ButtonBase, {
      slots: {
        default: buttonText,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the button text based on default slot', () => {
    const buttonTestId = 'button-base'
    const buttonElem = wrapper.find(`[data-testid="${buttonTestId}"]`)
    expect(buttonElem.text()).toBe(buttonText)
  })
})
