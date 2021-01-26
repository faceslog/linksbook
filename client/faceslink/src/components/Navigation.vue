<template>
    <header class="py-4 px-6 absolute top-0 left-0 right-0 z-10">
      <div class="container mx-auto text-white">
        <div class="flex items-center">
          <div class="flex-1">
            <!-- Logo <img src="@/assets/img/logo.svg" class="h-6"> -->
          </div>
          <button class="text-secondary lg:hidden">
            <svg class="current-fill h-6 w-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="-49 141 512 512" style="enable-background:new -49 141 512 512;" xml:space="preserve">
              <g>
                <g>
                  <path d="M413,422H1c-13.807,0-25-11.193-25-25s11.193-25,25-25h412c13.807,0,25,11.193,25,25S426.807,422,413,422z"/>
                </g>
                <g>
                  <path d="M413,562H1c-13.807,0-25-11.193-25-25s11.193-25,25-25h412c13.807,0,25,11.193,25,25S426.807,562,413,562z"/>
                </g>
                <g>
                  <path d="M413,282H1c-13.807,0-25-11.193-25-25s11.193-25,25-25h412c13.807,0,25,11.193,25,25S426.807,282,413,282z"/>
                </g>
              </g>
            </svg>
          </button>
          <nav class="hidden lg:flex items-center">
            <router-link to="/" class="px-6 py-3 font-bold uppercase text-secondary hover:text-primary">Home</router-link>
            <router-link to="/auth" class="px-6 py-3 font-bold uppercase text-primary">Login</router-link>
          </nav>
        </div>
      </div>
    </header>
</template>

<script>
export default {
  name: "Nav",
}
</script>