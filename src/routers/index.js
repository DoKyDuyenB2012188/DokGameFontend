import { createWebHistory, createRouter } from "vue-router";
// import ContactBook from "@/views/ContactBook.vue";
const routes = [
  {
    path: "/",
    name: "store",
    component: () => import("@/components/ListAllAppsComponent.vue"),
  },
 {
    path: "/store/filter/:filter",
    name: "filter",
    props: true,
    component: () => import("@/components/ListCardComponent.vue"),
  },
  {
    path: "/user/update",
    name: "update",
    component: () => import("@/views/UpdatePage.vue"),
  },

  {
    path: "/auth/login",
    name: "login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/auth/register",
    name: "register",
    component: () => import("@/views/RegisterPage.vue"),
  }
  ,
  {
    path: "/user/cart",
    name: "cart",
    component: () => import("@/views/CartPage.vue"),
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
