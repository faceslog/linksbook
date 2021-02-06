<template>

  <section class="min-w-screen min-h-screen background flex items-center justify-center font-sans tracking-normal select-none">
      
    <div class="p-3">
      <div v-if="isLoginForm">
        <login-form v-bind:is-login-form="isLoginForm" v-on:toggleForm="toggleForm($event)"></login-form>
      </div>
      <div v-else>
        <register-form v-bind:is-login-form="isLoginForm" v-on:toggleForm="toggleForm($event)"></register-form>
      </div>
    </div>
  </section>

</template>

<script>
import LoginForm from "../components/auth/Login.vue";
import RegisterForm from "../components/auth/Register.vue";

export default {
  name:'Sign',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return{
      isLoginForm: true
    };
  },
  methods: {
    toggleForm: function(form){
      if(form === 'login'){
        this.isLoginForm = true;
      }
      if(form === 'register'){
        this.isLoginForm = false;
      }
    }
  }
}
</script>

<style scoped>

  .background {
    background:  right 0% / 100% 100% no-repeat url("../assets/img/background/nasa.jpg");
  }

</style>