<template>
    <div class="dean-page" v-if="isAuthenticated">
      <!-- App Bar -->
      <header class="app-bar">
        <h1>Dean Dashboard</h1>
        <button @click="openLogoutModal" class="logout-button">Logout</button>
      </header>
  
      <div class="content-container">
        <!-- Left Section: Menu -->
        <div class="menu">
          <label for="menu-dropdown" class="menu-label">Navigate</label>
          <select id="menu-dropdown" @change="navigateToPage" v-model="selectedOption">
            <option value="kpi">KPI</option>
            <option value="instructor-schedule">Instructor Schedule</option>
            <option value="budget">Budget</option>
            <option value="self-development">Self-Development</option>
          </select>
        </div>
  
        <!-- Right Section: Profile -->
        <div class="profile">
          <img :src="profilePhoto" alt="Profile Photo" class="profile-photo" />
          <div class="profile-info">
            <h2 class="profile-name">{{ deanName }}</h2>
          </div>
        </div>
      </div>
  
      <!-- Placeholder for Selected Page -->
      <div class="page-content">
        <component :is="currentPage" />
      </div>
  
      <!-- Logout Confirmation Modal -->
      <div v-if="showLogoutModal" class="logout-modal">
        <div class="modal-content">
          <h3>Are you sure you want to logout?</h3>
          <div class="modal-actions">
            <button @click="confirmLogout" class="modal-confirm">Yes, Logout</button>
            <button @click="cancelLogout" class="modal-cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">Loading...</div> <!-- Show loading state -->
  </template>
  
  <script>
  // Import your pages
  import KpiPage from './KpiPage.vue';
  import InstructorSchedulePage from './InstructorSchedulePage.vue';
  import BudgetPage from './BudgetPage.vue';
  import SelfDevelopmentPage from './SelfDevelopmentPage.vue';
  import { signOut, getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
  import { auth } from '../firebase';  // Make sure this points to the correct Firebase configuration
  
  export default {
    name: 'DeanPage',
    data() {
      return {
        deanName: '',
        profilePhoto: '',
        selectedOption: 'kpi',
        isAuthenticated: false,
        showLogoutModal: false,
      };
    },
    computed: {
      currentPage() {
        const pages = {
          kpi: KpiPage,
          'instructor-schedule': InstructorSchedulePage,
          budget: BudgetPage,
          'self-development': SelfDevelopmentPage,
        };
        return pages[this.selectedOption];
      },
    },
    methods: {
      navigateToPage() {
        console.log(`Navigated to: ${this.selectedOption}`);
      },
      openLogoutModal() {
        this.showLogoutModal = true;
      },
      cancelLogout() {
        this.showLogoutModal = false;
      },
      async confirmLogout() {
        try {
          await signOut(auth);
          this.$router.push('/');
          this.showLogoutModal = false;
        } catch (error) {
          console.error("Error during logout: ", error);
          this.showLogoutModal = false;
        }
      },
    },
    created() {
      const authInstance = getAuth();
      setPersistence(authInstance, browserLocalPersistence)
        .then(() => {
          onAuthStateChanged(authInstance, (user) => {
            if (user) {
              this.isAuthenticated = true;
              this.deanName = user.displayName || 'Dean';  // Default name if empty
              this.profilePhoto = user.photoURL || require('@/assets/logo.png');  
            } else {
              this.isAuthenticated = false;
              this.$router.push('/');  // Redirect to login page if not authenticated
            }
          });
        })
        .catch((error) => {
          console.error("Error setting persistence:", error);
        });
    },
  };
  </script>
  
  <style scoped>
  /* App Bar */
  .app-bar {
    background-color: #034e69; /* Darker, more modern color */
    color: white;
    padding: 20px 30px;
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 4px solid #4caf50; /* Subtle border */
  }
  
  .app-bar h1 {
    margin: 0;
  }
  
  .logout-button {
    background-color: #7d7a7a;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 1.1rem;
  }
  
  .logout-button:hover {
    background-color: #696968;
    transform: scale(1.05);
  }
  
  /* Layout */
  .dean-page {
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f6f9;
    min-height: 100vh;
    padding: 20px;
  }
  
  .content-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    padding: 30px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
  }
  
  .menu {
    flex: 1 1 250px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.3s ease;
  }
  
  .menu:hover {
    transform: scale(1.05);
  }
  
  .menu-label {
    display: block;
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
  }
  
  .menu select {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease;
  }
  
  .menu select:focus {
    border-color: #4caf50;
    outline: none;
  }
  
  /* Profile Section */
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    justify-content: center;
    max-width: 250px;
  }
  
  .profile-photo {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #4caf50;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-name {
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  
  /* Page Content */
  .page-content {
    flex: 1;
    margin-top: 30px;
    padding: 30px;
    border: 2px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 60%;
    transition: transform 0.3s ease;
  }
  
  .page-content:hover {
    transform: scale(1.02);
  }
  
  /* Logout Modal */
  .logout-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .modal-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    text-align: center;
    width: 400px;
    animation: slideUp 0.3s forwards;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .modal-actions {
    margin-top: 20px;
  }
  
  .modal-confirm,
  .modal-cancel {
    background-color: #034e69;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    margin: 5px;
  }
  
  .modal-confirm:hover,
  .modal-cancel:hover {
    background-color: #034e69;
    transform: scale(1.05);
  }
  
  .modal-cancel {
    background-color: #a7a4a4;
  }
  
  .modal-cancel:hover {
    background-color: #aaaaaa;
  }
  
  .loading {
    font-size: 1.5rem;
    color: #034e69;
    font-weight: bold;
    text-align: center;
    margin-top: 50px;
  }
  </style>
  