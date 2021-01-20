<template>
  <div class="select-none font-sans">

    <!-- About the User -->
    <div class="lg:mt-12 mt-8 justify-center flex-wrap p-6 absolute w-full z-10 inset-0 mx-auto">

      <!-- User profile picture -->
      <section class="mx-auto lg:w-64 w-48">
        <img :src="user.avatar" class="mx-auto border-2 border-white w-36 h-36 my-10 rounded-full" alt="icon"/>
        <!-- User infos -->
        <div class="text-white text-center ml-1.5 lg:-mt-2.5 -mt-3.5">
          <p class="font-bold lg:text-lg text-base mb-2 transition duration-500 ease-in-out cursor-pointer transform hover:-translate-y-1 hover:scale-100">@{{ user.pseudo }}</p>
          <p class="lg:text-base text-sm tracking-wide">{{ user.welcomeText }}</p>
        </div>
      </section>

      <!-- Grid for apps icons -->
      <section class="px-5 md:mt-8 flex flex-wrap overflow-y-auto mt-4 justify-center mb-4">
        <!--Metric Card-->
          <div v-for="link in links" :key="link" class="w-full md:w-2/4 xl:w-1/6 p-2 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
            <div class="blur-filter border-white border rounded shadow-lg p-3" v-on:click="redirect(link.goto)">
              <div class="flex flex-row">
                <div class="flex-shrink pr-4">
                  <img :src="link.img" class="rounded h-10" alt="logo"/>
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
  name: 'Home',
  data() {
    return {
      user: {
        pseudo: "Jane Doe",
        avatar: "https://p.favim.com/orig/2018/07/24/tumblr-icon-girl-tumblr-girl-Favim.com-6032268.png",
        welcomeText: '"Welcome to my links book"',
        bgColor:"#070707",
        bgImg: "https://i.pinimg.com/originals/6a/50/e7/6a50e7373bf5a3619254673d8b471311.jpg"
      },
      links: [
        {
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png",
          goto: "https://www.instagram.com/",
          title:"My Instagram"
        },
        {
          img: "https://www.cineramageddon.com/wp-content/uploads/2020/06/twitter-logo.png",
          goto: "https://www.twitter.com/",
          title:"My Twitter"
        },
        {
          img: "https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png",
          goto: "https://www.youtube.com/",
          title:"My Youtube"
        }
      ]
    }
  },
  mounted() {
    if(!this.user.bgImg)
    {
      document.body.style.backgroundColor = this.user.bgColor;
    }
    else
    {
      document.body.style.backgroundImage = `url('${this.user.bgImg}')`;
    }

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
