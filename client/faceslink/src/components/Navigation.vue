<template>
    <nav id="header" class="fixed w-full z-30 top-0 text-white bg-black">
      <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <!-- Logo -->
        <div class="pl-4 flex items-center">
          <a class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-3xl" href="/">
            LINKSBOOK
          </a>
        </div>
        <!-- End Logo -->

        <!-- Menu for Mobile phone-->
        <div class="block lg:hidden pr-4">
          <button id="nav-toggle" class="flex items-center p-1 text-blue-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <!-- End Menu for Mobile phone-->


        <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-black lg:bg-transparent text-white p-4 lg:p-0 z-20" id="nav-content">
          <ul class="list-reset lg:flex justify-end flex-1 items-center -mr-20">
            
            <li class="mr-3">
              <a class="inline-block py-2 px-4 text-white font-bold no-underline" href="#">About</a>
            </li>

            <li class="mr-3">
              <a class="inline-block py-2 px-4 text-white font-bold no-underline" href="#">Contribute</a>
            </li>

            <li class="">
              <router-link to="/auth" class="inline-block py-2 px-4 text-white font-bold no-underline" href="#">Sign In</router-link>
            </li>
          </ul>

        </div>
      </div>
      <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
</template>

<script>
export default {
  name: "Nav",
  mounted(){
    document.getElementById('nav-toggle').onclick = function(){
		document.getElementById("nav-content").classList.toggle("hidden");
    }
  }

}
</script>