import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LecturerPage from '../views/LecturerPage.vue';
import DeanPage from '../views/DeanPage.vue';
import SecretaryPage from '../views/SecretaryPage.vue';
import { auth } from '../firebase'; // Firebase authentication import

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/lecturer',
    name: 'LecturerPage',
    component: LecturerPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/dean',
    name: 'DeanPage',
    component: DeanPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/secretary',
    name: 'SecretaryPage',
    component: SecretaryPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Firebase authentication check
    auth.onAuthStateChanged(user => {
      if (user) {
        // Redirect to the correct page based on user email
        const userEmail = user.email;
        if (userEmail === '6531503017@lamduan.mfu.ac.th' && to.name === 'SecretaryPage') {
          next();
        } else if (userEmail === '6531503176@lamduan.mfu.ac.th' && to.name === 'DeanPage') {
          next();
        } else if (userEmail === '6531503174@lamduan.mfu.ac.th' && to.name === 'LecturerPage') {
          next();
        } else {
          // Redirect to HomePage if role doesn't match
          next({ name: 'HomePage' });
        }
      } else {
        // If not logged in, redirect to HomePage
        next({ name: 'HomePage' });
      }
    });
  } else {
    next(); // If no authentication required, continue to the next route
  }
});

export default router;
