<template>
  <div class="bg-gradient-to-r from-gray-900 to-green-900 h-screen w-full">

    <div class="flex items-center justify-center absolute w-full z-10 inset-0 overflow-hidden">
      
      <div class="text-white text-center -mt-24">
        <img src="@/assets/img/error-404.png" class="w-4/5 lg:ml-20 ml-16 flex-initial">
        <p class="font-bold lg:text-3xl text-xl mb-7">"Looks like this page does not exist"</p>
        <button class="lg:text-base text-sm font-bold px-4 py-2 rounded-lg bg-green-700 border-white border">
          <router-link to="/">Home</router-link>
        </button>
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