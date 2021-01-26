<template>
  <div class=" bg-gray-500 h-screen w-full">

    <div class="flex items-center justify-center absolute w-full z-10 inset-0 overflow-hidden">
      <div class="text-white text-center -mt-24">
        <img src="@/assets/img/errors/error-404.png" class="w-4/5 lg:ml-20 ml-16 flex-initial">
        <p class="font-bold lg:text-3xl text-xl mb-4">"Looks like this page does not exist"</p>
        <router-link class="lg:text-lg text-white underline text-sm font-bold" to="/">Go Home</router-link>
      </div>
    </div>      

  </div>

</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>

</style>