import Vue from "vue";
import VueRouter from "vue-router";
import Discovery from "@/views/discovery";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/discovery",
  },
  {
    path: "/discovery",
    component: Discovery,
  },
  {
    path: "/playlist/:type/:id",
    component: () => import("@/views/playlist"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
