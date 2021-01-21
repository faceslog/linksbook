<template>
  <div class="select-none font-sans">

    <!-- About the User -->
    <div class="lg:mt-12 mt-8 justify-center flex-wrap p-6 absolute w-full z-10 inset-0 mx-auto">

      <!-- User profile picture -->
      <section class="mx-auto lg:w-64 w-48">
        <img :src="user.avatar" class="mx-auto border-2 border-white w-36 h-36 my-10 rounded-full" alt="icon"/>
        <!-- User infos -->
        <div class="text-white text-center ml-1.5 lg:-mt-2.5 -mt-3.5">
          <p class="font-bold lg:text-lg text-base mb-2 transition duration-500 ease-in-out cursor-pointer transform hover:-translate-y-1 hover:scale-100">@{{ user.username }}</p>
          <p class="lg:text-base text-sm tracking-wide">{{ user.welcomeText }}</p>
        </div>
      </section>

      <!-- Grid for apps icons -->
      <section class="px-5 md:mt-8 flex flex-wrap overflow-y-auto mt-4 justify-center mb-4">
        <!--Metric Card-->
        <div v-for="link in user.links" :key="link" class="w-full md:w-2/4 xl:w-1/6 p-2 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
          <div class="blur-filter border-white border rounded shadow-lg p-3" v-on:click="redirect(link.goto)">
            <div class="flex flex-row">
              <div class="flex-shrink pr-4">
                <img :src="link.image" class="rounded h-10" alt="logo"/>
              </div>
              <div class="flex-1 pt-2">
                <p class="font-bold tracking-wider text-sm text-white text-center">{{ link.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return {
      user: {
        username: "",
        avatar: "",
        welcomeText: '',
        bgColor:"",
        bgImg: "",
        links: []
      }
    }
  },
  mounted() {

    this.$http.get("/api/" + this.$route.params.username)
        .then(res => {

          // Copy the property from the data into the userpage
          for(const key in this.user)
          {
            this.user[key] = res.data.data[key];
          }

          // Set the background profile of the user
          if(!this.user.bgImg)
          {
            document.body.style.backgroundColor = this.user.bgColor;
          }
          else
          {
            document.body.style.backgroundImage = `url('${this.user.bgImg}')`;
          }

        })
        .catch(err => {

          let error = err.response;
          if(error.status === 404)
          {
            this.$router.push("/not-found");
          }
          else
          {
            this.$router.push("/");
          }

        });

  },
  methods: {
    redirect: function(link) {
      window.location.href = link;
    }
  }
}
</script>

<style>
.blur-filter {
  background: rgba(0,0,0,0.8);
  backdrop-filter: saturate(180%) blur(10px);
}
</style>
