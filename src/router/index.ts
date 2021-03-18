import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import axios from "axios";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import("../views/Account.vue"),
    beforeEnter(from, to, next) {
      axios.get("/logged-in").then((res) => {
        next()
      }).catch(() => {
        next("/login")
      })
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
    beforeEnter(from, to, next) {
      axios.get("/logged-in").then((res) => {
        next("/account")
      }).catch(() => {
        next()
      })
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register.vue"),
      beforeEnter(from, to, next) {
        axios.get("/logged-in").then((res) => {
          next("/account")
        }).catch(() => {
          next()
        })
      }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
