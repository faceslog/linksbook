<template>

  <div class="bg-gray-100 lg:w-3/5 lg:mx-auto text-gray-500 rounded-3xl shadow-xl overflow-hidden">
    <div class="md:flex w-full">
      <img src="@/assets/img/sign.jpg" class="hidden lg:block lg:w-1/2" alt="media"/>
      <div class="lg:w-1/2 w-full py-8 md:px-5 px-8">
        <div class="text-center md:mb-10 mb-5">
          <h1 class="font-bold lg:text-3xl text-2xl text-black mb-3">Sign Up.</h1>
          <p>Sign up and start managing all your links</p>
        </div>
        <div>
          <div class="-mx-3">
            <div class="w-full px-5 mb-5">
              <label class="text-xs font-semibold px-1">{{ usernameFeedback }}</label>
              <div class="flex">
                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                <input name="username" v-model="register.username" type="text" class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black" placeholder="myusername">
              </div>
            </div>
          </div>
          <div class="-mx-3">
            <div class="w-full px-5 mb-5">
              <label class="text-xs font-semibold px-1">{{ emailFeedback }}</label>
              <div class="flex">
                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                <input name="email" v-model="register.email" type="email" class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black" placeholder="amazing@email.com">
              </div>
            </div>
          </div>
          <div class="flex -mx-3">
            <div class="w-full px-5 mb-5">
              <label class="text-xs font-semibold px-1">{{ passwordFeedBack }}</label>
              <div class="flex">
                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                <input name="password" v-model="register.password" type="password" class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black" placeholder="************">
              </div>
            </div>
          </div>
          <div class="flex -mx-3">
            <div class="w-full px-5 lg:mb-10 mb-8">
              <label class="text-xs font-semibold px-1">Confirm Password</label>
              <div class="flex">
                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                <input v-model="register.confirmPassword" type="password" class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black" placeholder="************">
              </div>
            </div>
          </div>

          <div class="flex -mx-3 -mt-3">
            <div class="w-full px-5 md:mb-6 mb-4">
              <button @click="registerUser();" class="block w-full max-w-xs mx-auto bg-black hover:bg-green-900 focus:bg-green-600 text-white rounded-lg px-3 py-3 font-semibold">GO</button>
            </div>
          </div>
          <div class="flex justify-center">
            <!--Link To Toggle The Register Form-->
            <div @click="toggleForm('login');" class="text-sm text-gray-700 cursor-pointer hover:underline">Already have an account ?</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Register",
  props: {
    isLoginForm: Boolean
  },
  data() {
    return {
      //---------------------------
      register: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      //---------------------------
      usernameFeedback: "Username",
      emailFeedback: "Email",
      passwordFeedBack: "Password"
    };
  },
  methods: {
    toggleForm: function (string)
    {
      this.$emit('toggleForm', string);
    },
    isEmailValid: function ()
    {
      const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(!regExp.test(this.register.email))
      {
        this.emailFeedback = "Email Invalide"
        return false;
      }
      else
      {
        this.emailFeedback = "Email";
        return true;
      }
    },
    isUsernameValid: function ()
    {
        const regExp = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

        if(!regExp.test(this.register.username))
        {
          this.usernameFeedback = "4-20 characters and only _ or . are allowed";
          return false;
        }
        else
        {
          this.usernameFeedback = "Username";
          return true;
        }
    },
    isPasswordValid: function () {

        if(this.register.password.length < 8)
        {
          this.passwordFeedBack = "Password Must be 8 length !";
          return false;
        }
        else if(this.register.confirmPassword !== this.register.password)
        {
          this.passwordFeedBack = "Password does not match !";
          return false;
        }
        else
        {
          this.passwordFeedBack= "Password";
          return true;
        }
    },
    registerUser: async function ()
    {
      if(this.isUsernameValid() && this.isEmailValid() && this.isPasswordValid())
      {
        try
        {
          let response = await this.$http.post("/api/register", this.register);
          let token = response.data.token;

          if (token)
          {
            localStorage.setItem("jwt", token);
            await this.$router.push("/");
            this.$swal("Success", "Registration Was successful", "success");
          }
          else
          {
            this.$swal("Error", "Something Went Wrong", "error");
          }
        }
        catch (err)
        {
          let error = err.response;
          this.$swal("Error", error.data.message, "error");
        }
      }
    }
  }
}

</script>