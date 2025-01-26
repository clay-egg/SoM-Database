<template>
  <div class="login-section">
    <h3>Login</h3>
    <div class="login-form">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        id="email"
        v-model="loginEmail"
        placeholder="Enter your email"
        class="form-input"
        :class="{'input-error': emailError}"
        @blur="validateEmail"
      />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>

      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        id="password"
        v-model="loginPassword"
        placeholder="Enter your password"
        class="form-input"
        :class="{'input-error': passwordError}"
        @blur="validatePassword"
      />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>

      <button @click="handleLogin" class="login-button" :disabled="isLoading">Login</button>
      
      <div v-if="isLoading" class="loading-spinner">Loading...</div>

      <p class="note">Forgot your password? <a href="/reset-password" class="reset-link">Reset it here</a>.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default {
  setup() {
    const loginEmail = ref('');
    const loginPassword = ref('');
    const isLoading = ref(false);
    const emailError = ref('');
    const passwordError = ref('');
    const router = useRouter();

    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value = emailRegex.test(loginEmail.value) ? '' : 'Please enter a valid email';
    };

    const validatePassword = () => {
      passwordError.value = loginPassword.value.length >= 6 ? '' : 'Password must be at least 6 characters';
    };

    const handleLogin = async () => {
      // Reset errors
      emailError.value = '';
      passwordError.value = '';

      // Validate inputs
      validateEmail();
      validatePassword();

      if (emailError.value || passwordError.value) return;

      try {
        isLoading.value = true;
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
        const user = userCredential.user;

        if (user.email === 'dean@gmail.com') {
          router.push({ name: 'DeanPage' });
        } else if (user.email === 'lecturer@gmail.com') {
          router.push({ name: 'LecturerPage' });
        } else if (user.email === 'secretary@gmail.com') {
          router.push({ name: 'SecretaryPage' });
        } else {
          alert('This email is not associated with a role.');
        }
      } catch (error) {
        alert('Error logging in: ' + error.message);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      loginEmail,
      loginPassword,
      isLoading,
      emailError,
      passwordError,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Login Section */
.login-section {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
}

.login-section h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #034e69;
}

.login-section p {
  margin-bottom: 10px;
  color: #666;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.form-input {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #034e69;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.input-error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
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

.loading-spinner {
  font-size: 1rem;
  color: #034e69;
}

.note {
  font-size: 0.9rem;
  color: #666;
  margin-top: 15px;
}

.reset-link {
  color: #034e69;
  text-decoration: none;
  font-weight: bold;
}

.reset-link:hover {
  text-decoration: underline;
}
</style>
