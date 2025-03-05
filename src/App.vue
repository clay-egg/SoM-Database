<template>
  <div id="app">
    <div v-if="isLoading" class="loading-screen">Loading...</div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // Vue Composition API
import { auth } from './firebase'; // Firebase auth import
import { useRouter } from 'vue-router'; // Vue Router

export default {
  name: 'App',
  setup() {
    const isLoading = ref(true); // Initially set to true to show the loading screen
    const router = useRouter(); // Get the router instance

    // Wait for Firebase auth state to be determined before showing the app
    onMounted(() => {
      auth.onAuthStateChanged(user => {
        isLoading.value = false; // Hide loading screen once the auth state is resolved

        if (user) {
          // Redirect to appropriate page based on user email
          const userEmail = user.email;

          if (userEmail === 'phyominthein.leo@gmail.com') {
            router.replace({ name: 'SecretaryPage' });
          } else if (userEmail === '6531503172@lamduan.mfu.ac.th') {
            router.replace({ name: 'DeanPage' });
          } else if (userEmail === 'phyominthein.icloud@gmail.com') {
            router.replace({ name: 'LecturerPage' });
          } else {
            alert('Access denied: This email is not associated with an authorized role.');
            router.replace({ name: 'HomePage' }); // Redirect to home if not authorized
          }
        } else {
          // If no user is logged in, route to home page
          router.replace({ name: 'HomePage' });
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
