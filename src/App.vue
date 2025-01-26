<template>
  <div id="app">
    <div v-if="isLoading" class="loading-screen">Loading...</div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // Use ref and onMounted from Vue Composition API
import { auth } from './firebase'; // Firebase auth import
import { useRouter } from 'vue-router'; // Import Vue Router

export default {
  name: 'App',
  setup() {
    const isLoading = ref(true); // Initially set to true to show the loading screen
    const router = useRouter(); // Get the router instance

    // Wait for Firebase auth state to be determined before showing the app
    onMounted(() => {
      auth.onAuthStateChanged(user => {
        isLoading.value = false; // Hide loading screen when Firebase is ready

        if (user) {
          // If the user is logged in, replace the current page state
          if (router.currentRoute.name === 'HomePage') {
            router.replace({ name: 'LecturerPage' }); // Or route to appropriate page based on role
          }
        }
      });
    });

    return {
      isLoading,
    };
  },
};
</script>

<style>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 2rem;
  color: #034e69;
  z-index: 1000;
}
</style>
