<template>
  <form class='form' @submit.prevent='postData'>
    <h2 class='form-title'>Contact Us</h2>
    <div class='form-control' :class='{invalid: nameValidity}'>
      <label class='input-label'>Name</label>
      <input class='input-field' name='name' type='text' v-model.trim='name' @blur='validateNameInput' required/>
      <p class='input-notificatioin' v-if='nameValidity'>Username cannot be blank and has at least 25 characters and cannot be longer than 50 characters.</p>
    </div>
    <div class='form-control' :class='{invalid: emailValidity}'>
      <label class='input-label'>E-mail</label>
      <input class='input-field' name='email' type='text' v-model.trim='email' @blur='validateEmailInput' required/>
      <p class='input-notificatioin' v-if='emailValidity'>Invalid email value.</p>
    </div>
    <div class='form-control' :class='{invalid: subjectValidity}'>
      <label class='input-label'>Subject</label>
      <input class='input-field' name='subject' type='text' v-model.trim='subject' @blur='validateSubjectInput'/>
      <p class='input-notificatioin' v-if='subjectValidity'>Subject cannot be longer than 100 characters.</p>
    </div>
    <div class='form-control' :class='{invalid: messageValidity}'>
      <label class='input-label'>Message</label>
      <textarea row='20' placeholder='Your message here...' class='input-field' name='message' type='text-area' v-model.trim='message' @blur='validateMessageInput' required/>
      <p class='input-notificatioin' v-if='messageValidity'>Message cannot be blank and cannot be longer than 500 characters.</p>
    </div>
    <div>
        <button :class="{active: buttonActive}">
          <span class='button-content'>
            <p>SEND</p>
            <img class="arrow-icon" src="@/assets/right-arrow.png">
          </span>
        </button>
    </div>
    <div v-if='isSending || sendMessageError || sendMessageSuccess' class='sending-data'>
      <div v-if="isSending" class='sending-status'>
        <span class="loader"></span>
        <span>Sending date...</span>
      </div>
      <div v-if="true" class='sending-result' :class="{error: sendMessageError, success: sendMessageSuccess}">
        <img v-if='sendMessageSuccess' class="notification-icon" src="@/assets/success-icon.png">
        <img v-if='sendMessageError' class="notification-icon" src="@/assets/error-icon.png">
        <span>{{ messageStatusAlert }}</span>
      </div>
    </div>
  </form>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TheForm extends Vue {
  name=''

  email=''
  
  subject=''

  message=''

  nameValidity = false

  emailValidity = false

  subjectValidity = false

  messageValidity = false

  isSending = false

  buttonActive = false

  sendMessageSuccess = false

  sendMessageError = false

  messageStatusAlert = ''

  responseStatus = null

  responseError = null

  validateNameInput(): void {
    if(this.name.length < 5 || this.name.length > 50 || this.name.length === 0) {
      this.nameValidity = true
    } else {
      this.nameValidity = false
    }
  }

  validateEmailInput(): void {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(this.email.length === 0 || !this.email.match(pattern)) {
      this.emailValidity = true
    } else {
      this.emailValidity = false
    }
  }

  validateSubjectInput(): void {
    if(this.subject.length > 100) {
      this.subjectValidity = true
    } else {
      this.subjectValidity = false
    }
  }
    
  validateMessageInput(): void {
    if(this.message.length === 0 || this.message.length > 500) {
      this.messageValidity = true
    } else {
      this.messageValidity = false
    }
  }

  isFormValid(): boolean {
    return this.nameValidity === false && this.emailValidity === false && this.subjectValidity === false && this.messageValidity === false
  }

  sendData(): void {
    if (this.isFormValid) {
      if(this.responseStatus === 200) {
        this.sendMessageSuccess = true
        setTimeout(() => this.sendMessageSuccess = false, 5000)
        this.messageStatusAlert = 'Your message was successfully sent.'
        this.clearInptValues()
        this.buttonActive = true
      } else {
        this.sendMessageError = true
        setTimeout(() => this.sendMessageError = false, 5000)
        this.messageStatusAlert = this.responseError
      }
    }
      this.isSending = false
      this.responseStatus = null
      this.responseError = null
  }
 
  async postData(): Promise<void> {
    this.isSending = true
    await fetch('https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
      }),
    })
    .then(response => {
      response.json()
      this.responseStatus = response.status
    })
    .catch((error) => {
      this.responseError = error
    });
    this.sendData()
  }

  clearInptValues(): void {
    this.name=''
    this.email=''
    this.subject=''
    this.message=''
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.form {
  margin: 2rem auto;
  max-width: 25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  position: relative;
}
.form-title {
  font-size: 26px;
  font-weight: bold;
  font-stretch: extra-expanded;
  color: #a59aac;
}
.form-control.invalid input {
  border-color: #9700ff;
}
.form-control.invalid label {
  color: #9700ff;
}
.form-control {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 1.5rem;
}
.input-label {
  color: #8597a3;
  position: absolute;
  top: 1.5rem;
  transition: .25s ease;
}
.input-label.active {
  color: #6658d3;
  transform: translateY(-1.5rem);
}
.input-field {
  border: 0;
  background-color: transparent;
  border-bottom: 2px solid #eee; 
  font: inherit;
  font-size: 1rem;
  padding: 1.25rem 0;
}
.input-field:focus {
  outline: 0;
  border-bottom-color: rgb(182, 182, 182);
  padding: 1.5rem .25rem 0;
  transition: .25s ease;
}
.input-notificatioin {
  font-size: 14px;
  color: gray;
}
textarea {
  min-height: 100px;
  margin-top: 30px;
  color:gray;
  resize: none;
}
button {
  background: linear-gradient(to right, #cda9f2, #8c5df0);
  border-radius: 10rem;
  margin-top: 30px;
  width: 12rem;
  height: 4rem;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: none;
  color: white;
  font-weight: bold;
  font-stretch: ultra-condensed;
  transition: 1s ease;
}
button.active {
  background: #9090919c;
  color: white;
}
.button-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow-icon {
  margin-left: 10px;
}
.sending-data {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 60%;
  width: 400px;
  min-height: 120px;
  background-color: white;
  box-shadow: 0px 0px 58px 14px rgba(186, 186, 186, 1);
}
.sending-status {
  font-size: 18px;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #929292;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin-right: 20px;
}
.sending-result {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 20px;
}
.success {
  color:#53DC43;
}
.error {
  color:#fc573b;
}
.notification-icon {
  margin-right: 20px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
