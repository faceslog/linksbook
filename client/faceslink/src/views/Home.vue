<template>
  <div class="select-none h-screen bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 font-sans">

    <!-- About the User -->
    <section class="lg:mt-12 mt-8 justify-center flex-wrap p-6 absolute w-full z-10 inset-0 mx-auto">
      <!-- User profile picture -->
      <div class="mx-auto lg:w-64 w-48">
        <img :src="user.avatar" class="mx-auto border-2 border-white w-36 h-36 my-10 rounded-full" alt="icon"/>
        <!-- User infos -->
        <div class="text-white text-center ml-1.5 lg:-mt-2.5 -mt-3.5">
          <p class="font-bold lg:text-lg text-base mb-2">@{{ user.pseudo }}</p>
          <p class="lg:text-base text-sm tracking-wide">{{ user.welcomeText }}</p>
        </div>
      </div>
    </section>

    <!-- Grid for apps icons -->
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      user: {
        pseudo: "Jane Doe",
        avatar: "https://64.media.tumblr.com/0a4c1f31e5b47b9d946849cb0ef93c99/tumblr_pt6vjp5GkK1w4e8b4_1280.jpg",
        welcomeText: '"Welcome to my link book"'
      },
      links: [

      ]
    }
  },
  mounted() {

  },
  components: {

  }
}
</script>
