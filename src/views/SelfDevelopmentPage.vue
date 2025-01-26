<template>
  <div class="self-development-page">
    <h2>Self-Development Progress</h2>
    
    <!-- Categories -->
    <div class="categories">
      <div v-for="(category, index) in categories" :key="index" class="category-card">
        <h3>{{ category.name }}</h3>
        <div class="category-content">
          <!-- Display category as a card with gauge or progress -->
          <div v-if="category.type === 'gauge'">
            <canvas :id="'gauge-' + category.id" width="150" height="150"></canvas>
          </div>
          <div v-else class="progress-bar-container">
            <div class="progress-bar-title">{{ category.progressTitle }}</div>
            <div class="progress-bar">
              <div class="progress-bar-fill" :style="{ width: category.progress + '%' }"></div>
            </div>
            <p>{{ category.progress }}% Completed</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing Gauge.js library
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "SelfDevelopmentPage",
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "Reading Progress",
          type: "progress",
          progress: 70,
          progressTitle: "Books Read",
        },
        {
          id: 2,
          name: "Skill Mastery",
          type: "progress", // Changed to progress to match other categories
          progress: 50, // Percentage value for progress
          progressTitle: "Skill Mastery Progress",
        },
        {
          id: 3,
          name: "Physical Health",
          type: "progress",
          progress: 85,
          progressTitle: "Fitness Goals",
        },
        {
          id: 4,
          name: "Mindfulness",
          type: "progress",
          progress: 60,
          progressTitle: "Meditation Practice",
        },
      ],
    };
  },
  methods: {
    // This will draw the gauge chart for skill mastery if you want to keep it as a gauge
    drawGauge(id, value) {
      const ctx = document.getElementById(id).getContext('2d');
      new ChartJS(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [value, 100 - value],
              backgroundColor: ['#4caf50', '#e0e0e0'],
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: '80%',
          rotation: Math.PI,
          circumference: Math.PI,
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false,
            },
          },
        },
      });
    },
  },
  mounted() {
    // Draw the gauge charts after the component has been mounted if needed
    this.categories.forEach((category) => {
      if (category.type === 'gauge') {
        this.drawGauge('gauge-' + category.id, category.progress);
      }
    });
  },
};
</script>

<style scoped>
.self-development-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.categories {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-card {
  width: 200px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-content {
  margin-top: 10px;
}

.progress-bar-container {
  margin: 10px 0;
}

.progress-bar-title {
  font-weight: bold;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.5s ease;
}

canvas {
  margin: 0 auto;
}
</style>
