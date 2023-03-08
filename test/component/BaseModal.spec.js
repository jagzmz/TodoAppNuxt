import { mount } from '@vue/test-utils'
import { BaseModal } from '@/components/modals'

const labelOk = 'Confirm'
const labelCancel = 'Abort'

describe('BaseModal', () => {
  it('emits "ok" event when ok button is clicked', async () => {
    const wrapper = mount(BaseModal, {
      propsData: {
        modalProps: {
          labelOk,
          labelCancel,
        },
      },
    })
    const okButton = wrapper.find('[data-testid="ok-button"]')
    await okButton.trigger('click')
    expect(wrapper.emitted('ok')).toBeTruthy()
  })

  it('emits "cancel" event when cancel button is clicked', async () => {
    const wrapper = mount(BaseModal, {
      propsData: {
        modalProps: {
          labelOk,
          labelCancel,
        },
      },
    })
    const cancelButton = wrapper.find('[data-testid="cancel-button"]')
    await cancelButton.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('renders slot content', () => {
    const wrapper = mount(BaseModal, {
      slots: {
        default: '<p>Modal content</p>',
      },
    })
    expect(wrapper.find('p').text()).toBe('Modal content')
  })

  it('renders default button labels', () => {
    const wrapper = mount(BaseModal, {
      propsData: {
        modalProps: {
          labelOk,
          labelCancel,
        },
      },
    })
    expect(wrapper.find('[data-testid="ok-button"]').text()).toBe('Ok')
    expect(wrapper.find('[data-testid="cancel-button"]').text()).toBe('Cancel')
  })

  it('renders custom button labels', () => {
    const wrapper = mount(BaseModal, {
      propsData: {
        modalProps: {
          labelOk,
          labelCancel,
        },
      },
    })
    expect(wrapper.find('[data-testid="ok-button"]').text()).toBe(labelOk)
    expect(wrapper.find('[data-testid="cancel-button"]').text()).toBe(
      labelCancel
    )
  })
})
