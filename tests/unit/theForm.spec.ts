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
    it('#validateNameInput should return false if input is correct - true if not', () => {
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
  ])('#validateEmailInput', (mockEmail, expected) => {
    it('#validateEmailInput should return false if input is correct - true if not', () => {
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
    it('#validateSubjectInput should return false if input is correct - true if not', () => {
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
    it('#validateMessageInput should return false if input is correct - true if not', () => {
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

  describe.each([
    [false, false, false, false, true],
    [true, false, false, false, false],
    [undefined, false, false, false, false]
  ])('#isFormValid method', (nameValidity, emailValidity, subjectValidity, messageValidity, expected) => {
    it('#isFormValid should return if inputs validity are false', () => {
      wrapper = shallowMount(TheForm, {
        data() {
          return  {
            nameValidity,
            emailValidity,
            subjectValidity,
            messageValidity
          }
        }
      })
    wrapper.vm.isFormValid()
    expect(wrapper.vm.isFormValid()).toBe(expected)
    })
  })

  it('#clearInptValues should clear inputs value', () => {
    wrapper = shallowMount(TheForm, {
      data() {
        return {
          name: 'Joanna',
          email: 'joanna.kowalska@gmail.com',
          subject: 'Issue Report',
          message: 'Lorem ipsum dolor sit amet.',
       }
      }
    })
    wrapper.vm.clearInptValues()
    expect(wrapper.vm.name).toEqual('')
    expect(wrapper.vm.email).toEqual('')
    expect(wrapper.vm.subject).toEqual('')
    expect(wrapper.vm.message).toEqual('')
  })

  it('#sendData on success', () => {
    wrapper = shallowMount(TheForm, {
      data() {
        return {
          messageStatusAlert: '',
          buttonActive: false,
          responseStatus: 200
       }
      },
    })
    wrapper.vm.sendData()
    expect(wrapper.vm.messageStatusAlert).toEqual('Your message was successfully sent.')
    expect(wrapper.vm.buttonActive).toBe(true)
    wrapper.vm.clearInptValues()
  })

  it('#sendData on error', async () => {
    wrapper = shallowMount(TheForm, {
      data() {
        return {
          messageStatusAlert: '',
          responseError: 'TypeError: Internal Server Error.',
          responseStatus: 500,
        }
      },
    })
    await wrapper.vm.sendData()
    expect(wrapper.vm.messageStatusAlert).toEqual('TypeError: Internal Server Error.')
  })
})

