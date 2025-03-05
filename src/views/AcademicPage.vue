<template>
    <div class="powerbi-container">
      <iframe
        title="Publication_test"
        width="100%"
        height="800"
        src="https://app.powerbi.com/view?r=eyJrIjoiOTdhZjQ1MWEtYmQzNi00MDYyLWJlOGItNzc0YTUwYzljMmY3IiwidCI6ImU5NGQ1N2FkLWEwYjctNDRjZi04ODNmLWQ3OTg3YTBiZDI0NCIsImMiOjEwfQ%3D%3D"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: "AcademicPage",
  };
  </script>
  
  <style scoped>
  .powerbi-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  iframe {
    width: 100%;
    height: 800px;
  }
  </style>

