<template>
  <form class="form">
    <h2 class="form-title">Contact Us</h2>
    <div class="form-control">
      <label class="input-label">Name</label>
      <input class='input-field' name='name' type='text' v-model.trim='name'/>
    </div>
    <div class="form-control">
      <label class="input-label">E-mail</label>
      <input class='input-field' name='email' type='text' v-model.trim='email'/>
    </div>
    <div class="form-control">
      <label class="input-label">Subject</label>
      <input class='input-field' name='subject' type='text' v-model.trim='subject'/>
    </div>
    <div class="form-control">
      <label class="input-label">Message</label>
      <textarea row='20' placeholder='Your message here...' class='input-field' name='message' v-model.trim='message'/>
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
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
