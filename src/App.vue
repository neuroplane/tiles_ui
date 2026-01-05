<script setup>
import { ref } from 'vue'
import TilesContainer from './components/TilesContainer.vue'

// Примеры иконок (SVG paths)
const icons = {
  chart: {
    viewBox: '0 0 24 24',
    path: 'M3 3v18h18v-2H5V3H3zm16.293 3.293l-4.586 4.586-3.586-3.586L6 14.586 7.414 16l4.707-4.707 3.586 3.586L18 11.414l1.293 1.293z'
  },
  user: {
    viewBox: '0 0 24 24',
    path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  bell: {
    viewBox: '0 0 24 24',
    path: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'
  },
  star: {
    viewBox: '0 0 24 24',
    path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
  },
  heart: {
    viewBox: '0 0 24 24',
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  },
  settings: {
    viewBox: '0 0 24 24',
    path: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'
  }
}

// Примеры тайлов
const tiles = ref([
  // Тайлы 1x1
  {
    size: '1x1',
    color: 'blue',
    type: 'number',
    number: 42,
    badge: 'New'
  },
  {
    size: '1x1',
    color: 'green',
    type: 'number',
    number: 128
  },
  {
    size: '1x1',
    color: 'red',
    type: 'icon-value',
    icon: icons.chart,
    value: '85%'
  },
  {
    size: '1x1',
    color: 'orange',
    type: 'icon-value',
    icon: icons.user,
    value: '1.2K'
  },
  
  // Тайлы 2x1
  {
    size: '2x1',
    color: 'purple',
    type: 'title-value',
    title: 'Total Revenue',
    value: '$12,450',
    badge: '↑ 12%'
  },
  {
    size: '2x1',
    color: 'pink',
    type: 'title-icon-value',
    title: 'Active Users',
    icon: icons.user,
    value: '3,245'
  },
  
  // Тайлы 1x2
  {
    size: '1x2',
    color: 'teal',
    type: 'title-text',
    title: 'Notifications',
    text: 'You have 5 new messages and 3 pending tasks',
    badge: 8
  },
  {
    size: '1x2',
    color: 'yellow',
    type: 'icon-value',
    icon: icons.star,
    value: '4.8'
  },
  
  // Тайлы 2x2
  {
    size: '2x2',
    color: 'indigo',
    type: 'title-text',
    title: 'Dashboard Overview',
    text: 'Welcome to your dashboard. Here you can see all your important metrics and statistics at a glance.',
    badge: 'Pro'
  },
  {
    size: '2x2',
    color: 'cyan',
    type: 'title-icon-value',
    title: 'System Status',
    icon: icons.settings,
    value: 'All Systems Operational',
    badge: 'OK'
  },
  
  // Дополнительные тайлы
  {
    size: '1x1',
    color: 'lime',
    type: 'icon-value',
    icon: icons.bell,
    value: '24'
  },
  {
    size: '1x1',
    color: 'amber',
    type: 'icon-value',
    icon: icons.heart,
    value: '156'
  },
  {
    size: '2x1',
    color: 'blue',
    type: 'title-value',
    title: 'Monthly Sales',
    value: '$45,230'
  },
  {
    size: '1x1',
    color: 'green',
    type: 'number',
    number: 99
  },
  {
    size: '1x1',
    color: 'red',
    type: 'text',
    text: 'Hot'
  }
])
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Metro UI Tiles</h1>
      <p>Интерфейс на основе тайлов</p>
    </header>
    <TilesContainer :tiles="tiles" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #25326b 0%, #362448 100%);
  padding-bottom: 40px;
}

.app-header {
  text-align: center;
  padding: 40px 20px 20px;
  color: white;
}

.app-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.app-header p {
  margin: 0;
  font-size: 1.2em;
  opacity: 0.9;
}
</style>