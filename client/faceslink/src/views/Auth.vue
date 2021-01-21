<template>

    <section class="font-sans leading-normal tracking-normal select-none">
      <!----------------------------------------------CONTAINER TO FIT WITH PARTICLES EFFECTS CAN BE IMPROVE------------------------------------------------>
      <div class="flex items-center absolute justify-center p-3 z-10 inset-0">
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
