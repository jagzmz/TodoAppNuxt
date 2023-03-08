import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import { SiteHeader } from '@/components'

describe('SiteHeader', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(SiteHeader, {
      stubs: ['nuxt-link'],
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the title based on title prop', async () => {
    const title = 'Test title'
    wrapper.setProps({ title })
    await Vue.nextTick()
    const headingTestId = 'site-header-title'
    const headingElem = wrapper.find(`[data-testid="${headingTestId}"]`)
    expect(headingElem.text()).toBe(title)
  })
})
