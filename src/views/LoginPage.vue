<template>
  <div class="login-section">
    <h3>Login with Google</h3>
    <button @click="handleGoogleLogin" class="login-button" :disabled="isLoading">
      <span v-if="isLoading">Loading...</span>
      <span v-else>Sign in with Google</span>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

export default {
  setup() {
    const isLoading = ref(false);
    const router = useRouter();

    const handleGoogleLogin = async () => {
      try {
        isLoading.value = true;
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const userEmail = result.user.email;

          if (userEmail === '6531503017@lamduan.mfu.ac.th') {
          router.push({ name: 'SecretaryPage' });
        } else if (userEmail === '6531503176@lamduan.mfu.ac.th') {
          router.push({ name: 'DeanPage' });
        } else if (userEmail === '6531503174@lamduan.mfu.ac.th') {
          router.push({ name: 'LecturerPage' });
        } else {
          alert('Access denied: This email is not associated with an authorized role.');
        }
      } catch (error) {
        alert('Error logging in: ' + error.message);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      handleGoogleLogin,
    };
  },
};
</script>

<style scoped>
.login-section {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #034e69;
}

.login-button {
  padding: 12px 18px;
  font-size: 1rem;
  color: white;
  background-color: #034e69;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.login-button:hover {
  background-color: #05678a;
}
</style>
