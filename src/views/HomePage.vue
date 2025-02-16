<template>
  <div class="homepage">
    <!-- App Bar -->
    <div class="app-bar">
      <h1>SoM Database</h1>
    </div>

    <!-- Dropdown Menu -->
    <div class="dropdown-menu">
      <label for="data-select" class="dropdown-label">Navigate</label>
      <select id="data-select" v-model="selectedOption" @change="filterContent">
        <option value="overview">Overview</option>
        <option value="qa-report">QA Report</option>
        <option value="project">Project</option>
        <option value="academic-calendar">Academic Calendar</option>
        <option value="rules">Rules</option>
        <option value="manual">Manual</option>
        <option value="download-form">Download Form</option>
        <option value="strategic-plan">Strategic Plan</option>
        <option value="login">Login</option>
      </select>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <!-- Overview Section with Power BI Reports and Related Content -->
      <div v-if="selectedOption === 'overview'" class="section-content">
        <h3>Overview</h3>
        <p>General information and key metrics related to the academic sector.</p>

        <!-- Power BI Reports Side by Side -->
        <div class="topics-container">
          <div class="topic" @click="viewFullScreen('https://app.powerbi.com/view?r=eyJrIjoiOTBlMTMyYjgtOGY2ZS00YzczLWJlNDYtYWM1MjJhYTdlZGUyIiwidCI6ImU5NGQ1N2FkLWEwYjctNDRjZi04ODNmLWQ3OTg3YTBiZDI0NCIsImMiOjEwfQ%3D%3D')">
            <h4>Visiting Scholar</h4>
            <iframe
              src="https://app.powerbi.com/view?r=eyJrIjoiOTBlMTMyYjgtOGY2ZS00YzczLWJlNDYtYWM1MjJhYTdlZGUyIiwidCI6ImU5NGQ1N2FkLWEwYjctNDRjZi04ODNmLWQ3OTg3YTBiZDI0NCIsImMiOjEwfQ%3D%3D"
              class="powerbi-iframe"
              title="Visiting Scholar Power BI"
            ></iframe>
            <p>Details on the number of visiting scholars in the academic year.</p>
          </div>

          <div class="topic" @click="viewFullScreen('https://app.powerbi.com/view?r=eyJrIjoiYjBhOWI5Y2UtZDc3ZS00Mjc3LTgxZDAtZTYzNWFlYTRhMTVjIiwidCI6ImU5NGQ1N2FkLWEwYjctNDRjZi04ODNmLWQ3OTg3YTBiZDI0NCIsImMiOjEwfQ%3D%3D')">
            <h4>Student Exchange</h4>
            <iframe
              src="https://app.powerbi.com/view?r=eyJrIjoiYjBhOWI5Y2UtZDc3ZS00Mjc3LTgxZDAtZTYzNWFlYTRhMTVjIiwidCI6ImU5NGQ1N2FkLWEwYjctNDRjZi04ODNmLWQ3OTg3YTBiZDI0NCIsImMiOjEwfQ%3D%3D"
              class="powerbi-iframe"
              title="Student Exchange Power BI"
            ></iframe>
            <p>Overview of student exchange programs and their impact on international relations.</p>
          </div>

          <div class="topic" @click="viewFullScreen('https://app.powerbi.com/view?r=eyJrIjoiYWRiOTQ3NDgtNDhkYi00YmZlLTgxYmEtZjhhOGE4YmU5NjkzIiwidCI6ImU5NGQ1N2FkLWEwYjctNDRjZi04ODNmLWQ3OTg3YTBiZDI0NCIsImMiOjEwfQ%3D%3D')">
            <h4>Number of Students</h4>
            <iframe
              src="https://app.powerbi.com/view?r=eyJrIjoiYWRiOTQ3NDgtNDhkYi00YmZlLTgxYmEtZjhhOGE4YmU5NjkzIiwidCI6ImU5NGQ1N2FkLWEwYjctNDRjZi04ODNmLWQ3OTg3YTBiZDI0NCIsImMiOjEwfQ%3D%3D"
              class="powerbi-iframe"
              title="Number of Students Power BI"
            ></iframe>
            <p>Tracking the student population and growth over the last few years.</p>
          </div>
        </div>
      </div>

      <!-- Other Sections with Relevant Content -->
      <div v-else-if="selectedOption === 'qa-report'" class="section-content">
        <h3>QA Report</h3>
        <p>This section contains comprehensive QA reports that evaluate our processes and performance.</p>
        <a href="/qa-report-details" class="link">Read more about the QA Report</a>
      </div>

      <div v-else-if="selectedOption === 'project'" class="section-content">
        <h3>Project</h3>
        <p>Details of ongoing academic projects and their progress.</p>
        <img src="/images/project-image.jpg" alt="Project Image" class="project-image" />
        <a href="/project-details" class="link">View full project details</a>
      </div>

      <div v-else-if="selectedOption === 'academic-calendar'" class="section-content">
        <h3>Academic Calendar</h3>
        <p>Important academic dates and events to keep track of throughout the semester.</p>
        <img src="/images/academic-calendar.jpg" alt="Academic Calendar" class="calendar-image" />
        <a href="/calendar" class="link">View the full Academic Calendar</a>
      </div>

      <div v-else-if="selectedOption === 'rules'" class="section-content">
        <h3>Rules</h3>
        <p>This section contains institutional rules and regulations for both students and staff.</p>
        <a href="/rules" class="link">Read the full rules and regulations</a>
      </div>

      <div v-else-if="selectedOption === 'manual'" class="section-content">
        <h3>Manual</h3>
        <p>Access user manuals for various academic systems, including registration and grading.</p>
        <a href="/manual" class="link">Download the manual</a>
      </div>

      <div v-else-if="selectedOption === 'download-form'" class="section-content">
        <h3>Download Form</h3>
        <p>Download necessary forms for academic and administrative purposes.</p>
        <a href="/download-form" class="link">Download Forms</a>
      </div>

      <div v-else-if="selectedOption === 'strategic-plan'" class="section-content">
        <h3>Strategic Plan</h3>
        <p>Learn more about the university's strategic plan and future initiatives.</p>
        <a href="/strategic-plan" class="link">Explore the Strategic Plan</a>
      </div>

      <!-- Login Section -->
      <LoginPage v-else-if="selectedOption === 'login'" />

      <!-- Default Message if No Category is Selected -->
      <div v-else class="section-content">
        <h3>Select a Category</h3>
        <p>Please select a category from the dropdown to view content.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>&copy; 2025 SoM Database. All rights reserved.</p>
      <p>Contact us: <a href="mailto:support@somdatabase.com">support@somdatabase.com</a></p>
    </div>
  </div>
</template>

<script>
import LoginPage from './LoginPage.vue';
export default {
  components: {
    LoginPage,
  },
  data() {
    return {
      selectedOption: "overview", // Default option
    };
  },
  methods: {
    filterContent() {
      // Content handled dynamically based on dropdown selection
    },
    viewFullScreen(url) {
      // Open the Power BI report in full-page view
      window.open(url, "_blank");
    },
  },
};
</script>
<style scoped>
.homepage {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 0;
  margin: 0;
  color: #333;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-bar {
  background: linear-gradient(to right, #034E69, #05678A, #08A1C4);
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-bar h1 {
  font-size: 2.5rem;
  margin: 0;
}

.dropdown-menu {
  margin: 20px auto;
  width: 50%;
  text-align: left;
}

.dropdown-label {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #555;
}

#data-select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  transition: border 0.3s ease;
}

#data-select:focus {
  border-color: #034E69;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.content-section {
  margin-top: 30px;
  flex: 1;
}

.section-content {
  background-color: white;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  border-radius: 8px;
}

.section-content h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.section-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.link {
  font-size: 1.2rem;
  color: #034E69;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

.topics-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.topic {
  flex: 1;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 45%; /* Restrict width on large screens */
  margin-bottom: 20px;
}

.powerbi-iframe {
  width: 100%;
  height: 300px;
  border: none;
}

.project-image,
.calendar-image {
  max-width: 100%;
  border-radius: 8px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #034E69;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #034E69;
}

.footer {
  background-color: #034E69;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  margin-top: auto; /* Ensures footer stays at the bottom */
  width: 100%;
}


.footer p {
  margin: 5px 0;
}

.footer a {
  color: white;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .dropdown-menu {
    width: 70%;
  }
  
  .topics-container {
    gap: 10px;
  }

  .topic {
    max-width: 48%;
  }
}

@media (max-width: 768px) {
  .app-bar h1 {
    font-size: 2rem;
  }

  .dropdown-menu {
    width: 80%;
  }

  .topics-container {
    gap: 15px;
    flex-direction: column;
  }

  .topic {
    max-width: 100%;
  }

  .link {
    font-size: 1rem;
  }

  .project-image,
  .calendar-image {
    max-width: 100%;
  }

  .section-content h3 {
    font-size: 1.5rem;
  }

  .section-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .app-bar h1 {
    font-size: 1.6rem;
  }

  .dropdown-menu {
    width: 90%;
  }

  .topic {
    max-width: 100%;
    padding: 10px;
  }

  .link {
    font-size: 0.9rem;
  }

  .section-content h3 {
    font-size: 1.2rem;
  }

  .section-content p {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>