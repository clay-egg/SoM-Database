<template>
  <div class="kpi-page">
    <div class="controls">
      <label for="semester-dropdown">Select Semester:</label>
      <select id="semester-dropdown" v-model="selectedSemester" @change="updateData">
        <option v-for="semester in semesters" :key="semester" :value="semester">
          {{ semester }}
        </option>
      </select>

      <label for="track-dropdown">Select Track:</label>
      <select id="track-dropdown" v-model="selectedTrack" @change="updateData">
        <option v-for="track in tracks" :key="track" :value="track">
          {{ track }}
        </option>
      </select>
    </div>

    <div class="data">
      <h2>KPI Overview</h2>
      <p><strong>Semester:</strong> {{ selectedSemester }}</p>
      <p><strong>Track:</strong> {{ selectedTrack }}</p>
      <p>Your KPI performance is currently at <strong>{{ kpiData.performance }}</strong>.</p>
      <div class="mock-data">
        <h3>Details</h3>
        <ul>
          <li v-for="(value, key) in kpiData.details" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KpiPage",
  data() {
    return {
      // Dropdown options
      semesters: ["Semester1 2024", "Semester2 2024", "Semester1 2025"],
      tracks: ["Teaching", "Research", "Administration"],
      // Selected dropdown values
      selectedSemester: "Semester1 2024",
      selectedTrack: "Teaching",
      // Mock KPI data
      kpiData: {
        performance: "85%",
        details: {
          "Student Feedback": "90%",
          "Course Completion Rate": "88%",
          "Research Output": "75%",
        },
      },
    };
  },
  methods: {
    updateData() {
      // Update mock data when dropdowns are changed
      this.kpiData = this.getMockData(this.selectedSemester, this.selectedTrack);
    },
    getMockData(semester, track) {
      // Simulate data based on semester and track
      const mockDatabase = {
        "Semester1 2024": {
          Teaching: {
            performance: "85%",
            details: {
              "Student Feedback": "90%",
              "Course Completion Rate": "88%",
              "Teaching Innovation": "80%",
            },
          },
          Research: {
            performance: "78%",
            details: {
              "Papers Published": "5",
              "Citations": "120",
              "Grant Funding": "$50,000",
            },
          },
          Administration: {
            performance: "80%",
            details: {
              "Projects Managed": "3",
              "Efficiency": "85%",
              "Budget Utilization": "78%",
            },
          },
        },
        "Semester2 2024": {
          Teaching: {
            performance: "87%",
            details: {
              "Student Feedback": "92%",
              "Course Completion Rate": "90%",
              "Teaching Innovation": "85%",
            },
          },
          Research: {
            performance: "81%",
            details: {
              "Papers Published": "6",
              "Citations": "135",
              "Grant Funding": "$70,000",
            },
          },
          Administration: {
            performance: "82%",
            details: {
              "Projects Managed": "4",
              "Efficiency": "87%",
              "Budget Utilization": "80%",
            },
          },
        },
      };

      return mockDatabase[semester]?.[track] || {
        performance: "N/A",
        details: { "No Data Available": "" },
      };
    },
  },
};
</script>

<style scoped>
.kpi-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.controls label {
  font-weight: bold;
}

.controls select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.data {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mock-data h3 {
  margin-top: 20px;
}

.mock-data ul {
  list-style-type: none;
  padding: 0;
}

.mock-data li {
  margin: 10px 0;
}

.mock-data li strong {
  display: inline-block;
  width: 150px;
}
</style>
