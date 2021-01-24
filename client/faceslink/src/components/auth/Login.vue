<template>
    <div class="bg-gray-100 lg:w-1/2 lg:mx-auto text-gray-500 rounded-3xl shadow-xl overflow-hidden">
      <div class="md:flex w-full">
        <img src="@/assets/img/sign.jpg" class="hidden lg:block lg:w-1/2" alt="media"/>
        <div class="lg:w-1/2 w-full py-8 md:px-5 px-8">
          <div class="text-center md:mb-10 mb-5">
            <h1 class="font-bold lg:text-3xl text-2xl text-black mb-3">Sign In.</h1>
            <p>Sign in and get all your links to one single place</p>
          </div>
          <div>
            <div class="-mx-3">
              <div class="w-full px-5 mb-5">
                <label class="text-xs font-semibold px-1">Username | Email</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                  <input v-model="login.username" type="text" class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black" placeholder="myusername">
                </div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-5 lg:mb-10 mb-8">
                <label class="text-xs font-semibold px-1">Password</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                  <input v-model="login.password" type="password" class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black" placeholder="************">
                </div>
              </div>
            </div>

            <div class="flex -mx-3 -mt-3">
              <div class="w-full px-5 md:mb-6 mb-4">
                <button @click="loginUser();" class="block w-full max-w-xs mx-auto bg-black hover:bg-green-900 focus:bg-green-600 text-white rounded-lg px-3 py-3 font-semibold">GO</button>
              </div>
            </div>

            <div class="flex justify-center">
              <!--Link To Toggle The Register Form-->
              <div  class="text-sm text-gray-700 cursor-pointer hover:underline mb-4">Forgot your password ?</div>
            </div>

            <div class="flex justify-center">
              <!--Link To Toggle The Register Form-->
              <div @click="toggleForm('register')" class="text-sm text-gray-700 cursor-pointer hover:underline mb-6">Don't have an account ?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "Login",
  props: {
    //Props from Login.vue Parents
    isLoginForm: Boolean,
  },
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    toggleForm: function (string) {
      this.$emit('toggleForm', string);
    },
    loginUser: async function () {
      try
      {
        let response = await this.$http.post("/api/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);

        if(token)
        {
          this.$swal("Success", "Login Successful", "success");
          await this.$router.push("/dashboard");
        }
      }
      catch (e)
      {
        this.$swal("Error", "Something Went Wrong", "error");
      }
    }
  }
}

</script>