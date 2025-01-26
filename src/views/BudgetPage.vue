<template>
  <div class="budget-page">
    <div class="controls">
      <label for="semester-dropdown">Select Semester:</label>
      <select id="semester-dropdown" v-model="selectedSemester" @change="updateBudgetData">
        <option v-for="semester in semesters" :key="semester" :value="semester">
          {{ semester }}
        </option>
      </select>
    </div>

    <div class="card">
      <h2>Budget Details</h2>
      <p><strong>Total Budget Allocated:</strong> {{ budgetData.total }}</p>
      <p><strong>Remaining Budget:</strong> {{ budgetData.remaining }}</p>
      <canvas id="budget-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: "BudgetPage",
  data() {
    return {
      // Dropdown options
      semesters: ["Semester1 2024", "Semester2 2024", "Semester1 2025"],
      selectedSemester: "Semester1 2024",
      // Mock budget data
      budgetDatabase: {
        "Semester1 2024": { total: "$50,000", remaining: "$15,000" },
        "Semester2 2024": { total: "$60,000", remaining: "$20,000" },
        "Semester1 2025": { total: "$55,000", remaining: "$25,000" },
      },
      budgetData: { total: "$50,000", remaining: "$15,000" },
      chartInstance: null,
    };
  },
  methods: {
    updateBudgetData() {
      // Update budget data based on the selected semester
      this.budgetData = this.budgetDatabase[this.selectedSemester];
      this.updateChart();
    },
    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Parse budget values for chart display
      const total = parseInt(this.budgetData.total.replace("$", "").replace(",", ""));
      const remaining = parseInt(this.budgetData.remaining.replace("$", "").replace(",", ""));
      const spent = total - remaining;

      // Create bar chart
      const ctx = document.getElementById("budget-chart").getContext("2d");
      this.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Spent", "Remaining"],
          datasets: [
            {
              label: "Budget Breakdown",
              data: [spent, remaining],
              backgroundColor: ["#FF6384", "#36A2EB"],
              borderColor: ["#FF6384", "#36A2EB"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  mounted() {
    // Initialize chart when the component is mounted
    this.updateChart();
  },
};
</script>

<style scoped>
.budget-page {
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

canvas {
  margin-top: 20px;
  max-width: 100%;
}
</style>
