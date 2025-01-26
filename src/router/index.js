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
    meta: { requiresAuth: true, requiredRole: 'lecturer' },
  },
  {
    path: '/dean',
    name: 'DeanPage',
    component: DeanPage,
    meta: { requiresAuth: true, requiredRole: 'dean' },
  },
  {
    path: '/secretary',
    name: 'SecretaryPage',
    component: SecretaryPage,
    meta: { requiresAuth: true, requiredRole: 'secretary' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Firebase Auth initialization check to prevent flashing the home page
let isAuthInitialized = false;

router.beforeEach((to, from, next) => {
  if (!isAuthInitialized) {
    // Wait until Firebase Auth is ready
    auth.onAuthStateChanged(user => {
      isAuthInitialized = true;
      if (user) {
        // Redirect based on the role
        if (user.email === 'dean@gmail.com' && to.meta.requiredRole === 'dean') {
          next();
        } else if (user.email === 'lecturer@gmail.com' && to.meta.requiredRole === 'lecturer') {
          next();
        } else if (user.email === 'secretary@gmail.com' && to.meta.requiredRole === 'secretary') {
          next();
        } else {
          next({ name: 'HomePage' }); // Redirect if roles don't match
        }
      } else {
        // User is not authenticated
        if (to.meta.requiresAuth) {
          next({ name: 'HomePage' }); // Redirect to HomePage if auth required but not authenticated
        } else {
          next(); // Proceed if no auth is required
        }
      }
    });
  } else {
    next(); // Proceed to the next route if auth is already initialized
  }
});

export default router;
