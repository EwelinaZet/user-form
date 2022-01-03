import { shallowMount, Wrapper } from '@vue/test-utils'
import TheForm from '@/components/TheForm.vue'

describe('TheForm.vue', () => {
  let wrapper: Wrapper<TheForm & { [key: string]: any }>

  it('check name input value', () => {
    wrapper = shallowMount(TheForm, {
      data() {
        return {
          name: '',
       }
      }
    })
    const input = wrapper.find('input[name="name"]')
    expect(wrapper.vm.name).toEqual('')
    input.setValue('Joanna')
    expect(wrapper.vm.name).toEqual('Joanna')
  })

  it('check email input value', () => {
    wrapper = shallowMount(TheForm, {
      data() {
        return {
          email: '',
       }
      }
    })
    const input = wrapper.find('input[name="email"]')
    expect(wrapper.vm.email).toEqual('')
    input.setValue('joanna.kowalska@gmail.com')
    expect(wrapper.vm.email).toEqual('joanna.kowalska@gmail.com')
  })

  it('check subject input value', () => {
    wrapper = shallowMount(TheForm, {
      data() {
        return {
          subject: '',
       }
      }
    })
    const input = wrapper.find('input[name="subject"]')
    expect(wrapper.vm.subject).toEqual('')
    input.setValue('Issue Report')
    expect(wrapper.vm.subject).toEqual('Issue Report')
  })

  it('check message input value', () => {
    wrapper = shallowMount(TheForm, {
      data() {
        return {
          message: '',
       }
      }
    })
    const textarea = wrapper.find('textarea[name="message"]')
    expect(wrapper.vm.message).toEqual('')
    textarea.setValue('Lorem ipsum dolor sit amet.')
    expect(wrapper.vm.message).toEqual('Lorem ipsum dolor sit amet.')
  })
})

