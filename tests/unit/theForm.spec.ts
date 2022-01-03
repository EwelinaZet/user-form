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

  describe.each([
    ['Joa', true],
    ['JoannaJoannaJoannaJoannaJoannaJoannaJoannaJoannaJoanna', true],
    ['', true],
    ['Joanna', false]
  ])('#validateNameInput', (mockName, expected) => {
    it('validateNameInput', () => {
      wrapper = shallowMount(TheForm,{
        data() {
          return  { 
            name: mockName,
            nameValidity: false
          }
        }
      })

    wrapper.vm.validateNameInput()
    expect(wrapper.vm.nameValidity).toEqual(expected)
    })
  })

  describe.each([
    ['joanna.kowalskagmail.com', true],
    ['joanna.kowalska@com', true],
    ['', true],
    ['joanna.kowalska@gmail.com', false]
  ])('#validateEmailInpu', (mockEmail, expected) => {
    it('validateEmailInpu', () => {
      wrapper = shallowMount(TheForm,{
        data() {
          return  { 
            email: mockEmail,
            emailValidity: false
          }
        }
      })
      
    wrapper.vm.validateEmailInput()
    expect(wrapper.vm.emailValidity).toEqual(expected)
    })
  })

  describe.each([
    ['Issue Report Issue Report Issue Report Issue Report Issue Report Issue Report Issue Report Issue Report', true],
    ['Issue Report', false]
  ])('#validateSubjectInput', (mockSubject, expected) => {
    it('validateSubjectInput', () => {
      wrapper = shallowMount(TheForm,{
        data() {
          return  { 
            subject: mockSubject,
            subjectValidity: false
          }
        }
      })
    wrapper.vm.validateSubjectInput()
    expect(wrapper.vm.subjectValidity).toEqual(expected)
    })
  })

  describe.each([
    ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', true],
    ['', true],
    ['Lorem ipsum dolor sit amet.', false]
  ])('#validateMessageInput', (mockMessage, expected) => {
    it('validateMessageInput', () => {
      wrapper = shallowMount(TheForm, {
        data() {
          return  {
            message: mockMessage,
            messageValidity: false
          }
        }
      })
    wrapper.vm.validateMessageInput()
    expect(wrapper.vm.messageValidity).toEqual(expected)
    })
  })
})

