<script setup>
import { ref } from 'vue'
import TilesContainer from './components/TilesContainer.vue'
import Dialog from './components/Dialog.vue'
import Button from './components/Button.vue'

const showDialog = ref(false)

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
  },
  ticket: {
    viewBox: '0 0 24 24',
    path: 'M22 10V6C22 4.89 21.1 4 20 4H4C2.9 4 2 4.89 2 6V10C3.11 10 4 10.9 4 12S3.11 14 2 14V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V14C20.9 14 20 13.1 20 12S20.9 10 22 10M20 8.54C18.81 9.23 18 10.53 18 12S18.81 14.77 20 15.46V18H4V15.46C5.19 14.77 6 13.47 6 12C6 10.5 5.2 9.23 4 8.54L4 6H20V8.54M11 15H13V17H11M11 11H13V13H11M11 7H13V9H11Z'
  },
  task: {
    viewBox: '0 0 24 24',
    path: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  },
  accountGroup: {
    viewBox: '0 0 24 24',
    path: 'M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z'
  },
  accountClock: {
    viewBox: '0 0 24 24',
    path: 'M10.63,14.1C12.23,10.58 16.38,9.03 19.9,10.63C23.42,12.23 24.97,16.38 23.37,19.9C22.24,22.4 19.75,24 17,24C14.3,24 11.83,22.44 10.67,20H1V18C1.06,16.86 1.84,15.93 3.34,15.18C4.84,14.43 6.72,14.04 9,14C9.57,14 10.11,14.05 10.63,14.1V14.1M9,4C10.12,4.03 11.06,4.42 11.81,5.17C12.56,5.92 12.93,6.86 12.93,8C12.93,9.14 12.56,10.08 11.81,10.83C11.06,11.58 10.12,11.95 9,11.95C7.88,11.95 6.94,11.58 6.19,10.83C5.44,10.08 5.07,9.14 5.07,8C5.07,6.86 5.44,5.92 6.19,5.17C6.94,4.42 7.88,4.03 9,4M17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12A5,5 0 0,0 12,17A5,5 0 0,0 17,22M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14Z'
  }
}

// Примеры тайлов
// Типы: 
// icon-value
// text
// number
// list
// title-icon-value
// title-text
// title-value
const tiles = ref([
  // Тайлы 1x1
  {
    size: '2x1',
    color: 'blue',
    type: 'title-value',
    title: 'Долги СМК',
    value: '2 500'
  },
  {
    size: '1x1',
    color: 'blue',
    type: 'number',
    number: 8,
    badge: 'На смене'
  },
  {
    size: '2x1',
    color: 'green',
    type: 'title-text',
    value: 'СМК',
    title: 'На льду'
  },
  {
    size: '1x1',
    color: 'red',
    type: 'number',
    badge: 'Задачи',
    number: 3
  },
  {
    size: '1x1',
    color: 'orange',
    type: 'number',
    number: 19,
    badge: 'Заказы'
  },
  {
    size: '1x1',
    color: 'orange',
    type: 'number',
    number: '82%',
    badge: 'Явка'
  },
  
  // Тайлы 2x1
  {
    size: '2x1',
    color: 'purple',
    type: 'title-value',
    title: 'Долги по СМК',
    value: '12 450 ₽',
    badge: '↑ 12%'
  },
  {
    size: '2x1',
    color: 'pink',
    type: 'title-icon-value',
    icon: icons.user,
    value: '3,245'
  },
  
  // Тайлы 1x2
  {
    size: '1x1',
    color: 'teal',
    type: 'title-text',

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
    size: '2x1',
    color: 'indigo',
    type: 'title-text',
    title: 'Dashboard Overview',
    text: 'Welcome to your dashboard. Here you can see all your important metrics and statistics at a glance.',
    badge: 'Pro',
    clickable: true,
    onClick: (tile, index) => {
      console.log('Клик по тайлу:', tile, index)
      showDialog.value = true
    }
  },
  {
    size: '2x1',
    color: 'cyan',
    type: 'title-value',
    title: 'System Status',
    value: 'All Systems Operational',
    badge: 'Active'
  },
  {
    size: '2x1',
    color: 'blue',
    type: 'list',
    title: 'Праздники',
    items: [
      { text: 'Рождество Христово', value: '7.01.2026'},
      { text: 'День работника прокуратуры Российской Федерации', value: '12.01.2026'},
      { text: 'День российской печати', value: '13.01.2026'},
      //{ text: 'System update', value: '2d ago', icon: icons.settings },
      //{ text: 'Report generated', value: '3d ago', icon: icons.chart },
      //{ text: 'New ticket created', value: '2h ago', icon: icons.ticket },
      //{ text: 'Task completed', value: '5h ago', icon: icons.task },
      //{ text: 'User registered', value: '1d ago', icon: icons.user },
      //{ text: 'System update', value: '2d ago', icon: icons.settings },
      //{ text: 'Report generated', value: '3d ago', icon: icons.chart }
    ]
  },
  {
    size: '2x1',
    color: 'blue',
    type: 'list',
    title: 'Онлайн-кассы',
    items: [
      { text: '18:30', value: 'В3 · Д1 · К2'},
      { text: '19:00', value: '1 · 1 · 2'},
      { text: '19:30', value: '2 · 1 · 2'},
      { text: '20:00', value: '3 · 1 · 2'},
    ]
  },
  {
    size: '2x1',
    color: 'blue',
    type: 'list',
    title: 'Реестр оплат',
    items: [
      { text: 'Аренда большого льда', value: '9 000'},
      { text: 'Оплата услуги. СМК', value: '500'},
      { text: 'Оплата абонемента. УТГФ', value: '12 000'},
      { text: 'Оплата абонемента. УТГХ', value: '7 500'},
    ]
  },
  {
    size: '1x1',
    color: 'blue',
    type: 'list',
    title: 'Дни рождения',
    items: [
      { text: 'БояркинаАЕ'},
      { text: 'БояркинаАЕ'},
      { text: 'БояркинаАЕ'},
    ]
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
  },
  {
    size: '1x1',
    color: 'purple',
    type: 'icon-value',
    icon: icons.ticket,
    value: '24'
  },
  {
    size: '1x1',
    color: 'teal',
    type: 'icon-value',
    icon: icons.task,
    value: '12'
  },
  {
    size: '1x1',
    color: 'indigo',
    type: 'icon-value',
    icon: icons.accountGroup,
    value: '48'
  },
  {
    size: '1x1',
    color: 'cyan',
    type: 'icon-value',
    icon: icons.accountClock,
    value: '36'
  },
  {
    size: '2x1',
    color: 'orange',
    type: 'title-icon-value',
    title: 'Tickets',
    icon: icons.ticket,
    value: '48'
  },
  {
    size: '2x1',
    color: 'pink',
    type: 'title-icon-value',
    title: 'Tasks',
    icon: icons.task,
    value: '36'
  }
])
</script>

<template>
  <div class="app">
    <TilesContainer :tiles="tiles" maxWidth="1200px" />
    
    <!-- Пример диалогового окна -->
    <Dialog v-model="showDialog" title="Пример диалога">
      <p>Это тело диалогового окна. Здесь может быть любой контент.</p>
      <p>Диалог автоматически центрируется и имеет затемненный фон.</p>
      
      <template #footer>
        <Button size="small" variant="secondary" @click="showDialog = false">Закрыть</Button>
        <Button size="small" variant="primary" @click="showDialog = false">ОК</Button>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #162c42 0%, #0c1823 100%);
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