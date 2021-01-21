import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import Auth from "@/views/Auth";
import Dashboard from "@/views/secure/Dashboard";
import NotFound from "@/views/errors/404";
import User from "@/views/User";

const routes = [
  {
    path: '/',
    name: "Home",
    component: Home
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth
  },
  {
    path: "/not-found",
    name: "404",
    component: NotFound
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta : {
      requiresAuth: true
    }
  },
  {
    path: "/:username",
    name: "User",
    component: User
  },
  {
    path: "/:catchAll(.*)",
    redirect: { path: "/not-found" }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {

  // TO DO VERIFY IN THE BACKEND IF THE USER CAN ACCESS THIS ROUTE
  if(to.matched.some(record => record.meta.requiresAuth))
  {
    if(!localStorage.getItem("jwt"))
    {
      next({
        path: '/auth'
      });
    }
    else
    {
      next();
    }
  }
  else
  {
    next();
  }

});

export default router
