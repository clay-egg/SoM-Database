<template>
  <div class="schedule-page">
    <div class="controls">
      <label for="day-dropdown">Select Day:</label>
      <select id="day-dropdown" v-model="selectedDay" @change="updateSchedule">
        <option v-for="day in days" :key="day" :value="day">
          {{ day }}
        </option>
      </select>
    </div>

    <div class="card">
      <h2>My Schedule</h2>

      <!-- Timetable as a Table -->
      <div v-if="schedule.length > 0">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Time</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in schedule" :key="index">
              <td>{{ item.course }}</td>
              <td>{{ item.time }}</td>
              <td>{{ selectedDay }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <p>No classes scheduled for {{ selectedDay }}.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstructorSchedule",
  data() {
    return {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      selectedDay: "Monday",
      scheduleDatabase: {
        Monday: [
          { course: "Database Management", time: "10:00 AM - 12:00 PM" },
          { course: "Networking Basics", time: "1:00 PM - 3:00 PM" },
          { course: "Data Structures", time: "3:30 PM - 5:00 PM" },
        ],
        Tuesday: [
          { course: "Operating Systems", time: "9:00 AM - 11:00 AM" },
          { course: "Algorithm Design", time: "11:30 AM - 1:00 PM" },
          { course: "Software Engineering", time: "2:00 PM - 4:00 PM" },
        ],
        Wednesday: [
          { course: "Software Design", time: "2:00 PM - 4:00 PM" },
          { course: "Computer Networks", time: "5:00 PM - 7:00 PM" },
        ],
        Thursday: [
          { course: "Web Development", time: "9:00 AM - 11:00 AM" },
          { course: "Mobile App Development", time: "1:00 PM - 3:00 PM" },
          { course: "Cloud Computing", time: "3:30 PM - 5:30 PM" },
        ],
        Friday: [
          { course: "Advanced Programming", time: "9:00 AM - 11:00 AM" },
          { course: "Database Management", time: "1:00 PM - 3:00 PM" },
        ],
      },
      schedule: [],
    };
  },
  methods: {
    updateSchedule() {
      // Update schedule based on the selected day
      this.schedule = this.scheduleDatabase[this.selectedDay];
    },
  },
  mounted() {
    // Initialize schedule for the default day
    this.updateSchedule();
  },
};
</script>

<style scoped>
.schedule-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
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

.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
