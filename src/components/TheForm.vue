<template>
  <form class='form'>
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
        <button>
          <span class='button-content'>
            <p>SEND</p>
          </span>
        </button>
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
    if(this.name.length === 0 || this.name.length > 500) {
      this.messageValidity = true
    } else {
      this.messageValidity = false
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
