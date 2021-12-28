<template>
  <div id="app">
    <TheForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheForm from './components/TheForm.vue';

@Component({
  components: {
    TheForm
  },
})
export default class App extends Vue {}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background: linear-gradient(to right, #dd65ff, #3d1b86);
  padding: 10px;
}
</style>
