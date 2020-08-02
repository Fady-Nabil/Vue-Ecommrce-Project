import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Overview from '../views/Overview.vue'
import Products from '../views/Products.vue'
import Orders from '../views/Orders.vue'
import {fb} from '../firebase.js'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { RequireAuth: true },
      children: [
        //nested routes in parent route (admin)
        {
          path: 'overview',
          name: 'overview',
          component: Overview,
        },
        {
          path: 'products',
          name: 'products',
          component: Products,
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
        },
      ],
    },
    {
      path: 'about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
  ],
});

/*to prevent not loggedin users from accessing admin page */
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router
