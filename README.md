# Tiles UI

Современный интерфейс на основе тайлов. Пакет можно использовать как **чистый CSS-фреймворк** или как **Vue 3 компоненты**.

Демо: [tiles.tagban.ru](https://tiles.tagban.ru)

![Tiles UI](https://images.x125.ru/images/6ec23035-6ae6-4713-a453-23e365c73c96.jpg)

## Установка

```bash
npm install tiles-ui
# или
pnpm add tiles-ui
```

### CSS (любой стек)

```html
<link rel="stylesheet" href="https://unpkg.com/tiles-ui/dist/css/tiles-ui.min.css">
```

```js
import 'tiles-ui/css'
```

HTML-классы, кнопки и диалоги описаны в [CSS-FRAMEWORK.md](./CSS-FRAMEWORK.md).

### Vue 3

Нужен бандлер, который умеет компилировать `.vue` (Vite, Nuxt, Vue CLI).

```vue
<script setup>
import { ref } from 'vue'
import { TilesContainer } from 'tiles-ui'

const tiles = ref([
  { size: '1x1', color: 'blue', type: 'number', number: 42, badge: 'New' },
  { size: '2x1', color: 'green', type: 'title-value', title: 'Total Revenue', value: '$12,450' }
])
</script>

<template>
  <TilesContainer :tiles="tiles" max-width="1200px" />
</template>
```

Или подключить все компоненты сразу:

```js
import { createApp } from 'vue'
import TilesUI from 'tiles-ui'
import App from './App.vue'

createApp(App).use(TilesUI).mount('#app')
```

Глобальные имена плагина: `Tile`, `TilesContainer`, `TilesButton`, `TilesDialog`, `TilesInput`, `TilesToast`, `TilesSkeleton`.

## Как повторить демо

На [tiles.tagban.ru](https://tiles.tagban.ru) и на скриншоте выше — не «магия CSS», а связка:

| Что видите | Откуда |
| --- | --- |
| Цвета, сетка, шрифты, прогресс-бар, квадрант | `tiles-ui/css` |
| Цифры, списки, бейджи | ваши данные в HTML или в пропсах `Tile` |
| Тикающий таймер | Vue: `type: 'timer'` + `timerTarget` |
| Линия графика | Vue: `type: 'chart'` + `chartData`, либо готовый SVG `path` в HTML |
| Диалог, тосты, скелетон | компоненты `Dialog`, `Toast`, `Skeleton` |
| Тёмный фон и шапка | стили страницы, их в пакете нет |

Без Vue можно собрать **внешность** (см. [CSS-FRAMEWORK.md](./CSS-FRAMEWORK.md)). Поведение таймера, графика, диалога и тостов как на демо — через Vue или свой JS.

### Фон как на демо

```css
body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #162c42 0%, #0c1823 100%);
  font-family: system-ui, sans-serif;
  color: #fff;
}
```

### Vue: сетка, диалог, тосты, скелетон

Нужны Vue 3 и бандлер с поддержкой `.vue`. CSS из пакета подключать не обязательно: стили уже внутри компонентов.

```vue
<script setup>
import { ref, onMounted } from 'vue'
import {
  TilesContainer,
  Button,
  Dialog,
  Input,
  Toast,
  Skeleton
} from 'tiles-ui'

const isLoading = ref(true)
const showDialog = ref(false)
const toastRef = ref(null)
const name = ref('')

onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 2000)
})

const notify = (type, message) => {
  toastRef.value?.[type](message, { title: type.toUpperCase() })
}

const tiles = [
  { size: '1x1', color: 'blue', type: 'number', number: 42, badge: 'NEW' },
  { size: '1x1', color: 'red', type: 'text', text: 'Важно' },
  { size: '1x1', color: 'green', type: 'progress', title: 'CPU', progressPercent: 15 },
  {
    size: '1x1',
    color: 'blue',
    type: 'timer',
    title: 'До старта',
    timerTarget: Date.now() + 30 * 60 * 1000
  },
  {
    size: '1x1',
    type: 'quadrant',
    indicators: ['success', 'success', 'success', 'danger']
  },
  {
    size: '2x1',
    color: 'teal',
    type: 'title-value',
    title: 'Выручка',
    value: '124 500 ₽',
    badge: '+12%'
  },
  {
    size: '1x1',
    color: 'orange',
    type: 'chart',
    title: 'Продажи',
    chartData: [30, 45, 35, 50, 55, 40, 65],
    chartValue: '+23%'
  },
  {
    size: '1x2',
    color: 'pink',
    type: 'list',
    title: 'События',
    items: [
      { text: 'Заказ #1234', value: '2 мин' },
      { text: 'Новый клиент', value: '5 мин' },
      { text: 'Оплата', value: '12 мин' }
    ]
  }
]
</script>

<template>
  <header>
    <Button variant="primary" @click="showDialog = true">Диалог</Button>
    <Button variant="secondary" @click="notify('success', 'Операция выполнена')">Success</Button>
    <Button variant="outline" @click="notify('info', 'Новое уведомление')">Info</Button>
  </header>

  <Skeleton v-if="isLoading" variant="tiles-grid" :count="8" />
  <TilesContainer v-else :tiles="tiles" max-width="1200px" />

  <Toast ref="toastRef" />

  <Dialog v-model="showDialog" title="Информация">
    <Input v-model="name" label="ФИО" placeholder="Имя" />
    <template #footer>
      <Button size="small" variant="secondary" @click="showDialog = false">Отмена</Button>
      <Button size="small" variant="primary" @click="showDialog = false; notify('success', 'Сохранено')">
        Сохранить
      </Button>
    </template>
  </Dialog>
</template>
```

Пропсы тайлов, которые крутят демо:

- `progress` — `progressPercent` (0–100), полоска рисуется CSS
- `chart` — `chartData: number[]` (sparkline) и `chartValue` (подпись). Путь SVG считает компонент
- `timer` — `timerTarget`: timestamp или ISO-строка. Компонент обновляет часы/минуты/секунды каждую секунду
- `quadrant` — `indicators`: четыре значения `danger` | `warning` | `success` | `empty`
- `list` — `items: [{ text, value, icon? }]`
- клик по тайлу — `clickable: true` и `onClick`

Тосты: у `Toast` через `ref` вызываются `success`, `error`, `warning`, `info`.

### Без Vue, только CSS

Подключите `tiles-ui.min.css` и разметьте HTML классами. Таймер будет статичным, пока сами не обновите цифры. Для графика вставьте SVG `path` (пример в [CSS-FRAMEWORK.md](./CSS-FRAMEWORK.md)). Диалог показывается классом на оверлее, тост — своим HTML; логику открытия пишете сами.

## 🎯 Особенности

- **Гибкие размеры тайлов**: 1×1, 2×1, 1×2, 2×2
- **Различные типы контента**: число, текст, список, прогресс, таймер, график, квадрант и другие
- **12 цветовых схем** с градиентами (второй цвет на 20% темнее первого)
- **Бейджи** в правом верхнем углу
- **Кликабельные тайлы** с визуальной обратной связью
- **Компактные списки** для отображения активности
- **Оптимизированное размещение** с автоматическим заполнением пустот (CSS Grid)
- **Центрирование контейнера** и сетки
- **Адаптивный дизайн**

## 📦 Технологии

- **Vue 3** - прогрессивный JavaScript фреймворк
- **Vite** - быстрый сборщик и dev-сервер
- **pnpm** - эффективный менеджер пакетов

## 🚀 Разработка

### Установка зависимостей

```bash
pnpm install
```

### Запуск dev-сервера

```bash
pnpm dev
```

### Сборка для production

```bash
pnpm build
```

### Просмотр production сборки

```bash
pnpm preview
```

## 📐 Размеры тайлов

Базовый размер тайла 1×1 составляет **140px × 140px**. Остальные размеры:

- **1×1**: 140px × 140px (1 ячейка)
- **2×1**: 280px × 140px (2 ячейки по ширине)
- **1×2**: 140px × 280px (2 ячейки по высоте)
- **2×2**: 280px × 280px (4 ячейки)

## 🎨 Типы тайлов

### `number`
Отображает только число.

```vue
{
  size: '1x1',
  color: 'blue',
  type: 'number',
  number: 42,
  badge: 'New'
}
```

### `title-value`
Заголовок вверху, значение внизу.

```vue
{
  size: '2x1',
  color: 'purple',
  type: 'title-value',
  title: 'Total Revenue',
  value: '$12,450',
  badge: '↑ 12%'
}
```

### `icon-value`
Иконка и значение, центрированы.

```vue
{
  size: '1x1',
  color: 'red',
  type: 'icon-value',
  icon: { viewBox: '0 0 24 24', path: '...' },
  value: '85%'
}
```

### `title-icon-value`
Заголовок вверху, иконка и значение внизу.

```vue
{
  size: '2x2',
  color: 'cyan',
  type: 'title-icon-value',
  title: 'System Status',
  icon: { viewBox: '0 0 24 24', path: '...' },
  value: 'All Systems Operational',
  badge: 'OK'
}
```

### `text`
Только текст, центрирован.

```vue
{
  size: '1x1',
  color: 'red',
  type: 'text',
  text: 'Hot'
}
```

### `title-text`
Заголовок вверху, текст внизу.

```vue
{
  size: '1x2',
  color: 'teal',
  type: 'title-text',
  title: 'Notifications',
  text: 'You have 5 new messages and 3 pending tasks',
  badge: 8
}
```

### `list`
Компактный список элементов с иконками и значениями.

```vue
{
  size: '2x2',
  color: 'purple',
  type: 'list',
  title: 'Recent Activities',
  items: [
    { text: 'New ticket created', value: '2h ago', icon: icons.ticket },
    { text: 'Task completed', value: '5h ago', icon: icons.task },
    { text: 'User registered', value: '1d ago', icon: icons.user }
  ]
}
```

### `progress`
Полоска и процент. Ширину задаёт `progressPercent`.

```js
{ size: '1x1', color: 'green', type: 'progress', title: 'CPU', progressPercent: 15 }
```

### `chart`
Мини-график. `chartData` — массив чисел, `chartValue` — подпись снизу.

```js
{
  size: '1x1',
  color: 'orange',
  type: 'chart',
  title: 'Продажи',
  chartData: [30, 45, 35, 50, 55, 40, 65],
  chartValue: '+23%'
}
```

### `timer`
Обратный отсчёт до `timerTarget` (timestamp или ISO-дата). Тикает сам, раз в секунду.

```js
{
  size: '1x1',
  color: 'blue',
  type: 'timer',
  title: 'До старта',
  timerTarget: Date.now() + 30 * 60 * 1000
}
```

### `quadrant`
Четыре квадрата. Класс цвета у тайла не нужен — работают `indicators`.

```js
{
  size: '1x1',
  type: 'quadrant',
  indicators: ['danger', 'warning', 'success', 'empty']
}
```

## 🎨 Цветовые схемы

Доступно 12 цветовых схем с градиентами:

- `blue` - синий
- `green` - зеленый
- `red` - красный
- `orange` - оранжевый
- `purple` - фиолетовый
- `pink` - розовый
- `teal` - бирюзовый
- `yellow` - желтый
- `indigo` - индиго
- `cyan` - циан
- `lime` - лайм
- `amber` - янтарный

## 🏷️ Бейджи

Бейджи отображаются в правом верхнем углу тайла. Могут быть строкой или числом:

```vue
{
  badge: 'New'        // строка
  badge: 8            // число
  badge: '↑ 12%'      // строка с символом
}
```

## 🖱️ Кликабельные тайлы

Тайлы могут быть кликабельными с визуальной обратной связью:

```vue
{
  size: '2x1',
  color: 'purple',
  type: 'title-value',
  title: 'Total Revenue',
  value: '$12,450',
  clickable: true,
  onClick: (tile, index) => {
    console.log('Клик по тайлу:', tile, index)
    // Ваша логика обработки клика
  }
}
```

**Визуальные эффекты:**
- Курсор меняется на `pointer` при наведении
- Тайл увеличивается на 2% при наведении
- Тайл уменьшается при нажатии

## 🎨 Иконки

Доступны готовые иконки для использования в тайлах:

- `chart` - график
- `user` - пользователь
- `bell` - уведомление
- `star` - звезда
- `heart` - сердце
- `settings` - настройки
- `ticket` - билет
- `task` - задание
- `accountGroup` - группа пользователей
- `accountClock` - пользователь с часами

**Пример использования:**

```vue
import { icons } from './App.vue'

{
  type: 'icon-value',
  icon: icons.ticket,
  value: '24'
}
```

## 📦 Структура проекта

```
tiles_ui/
├── src/
│   ├── components/
│   │   ├── Tile.vue           # Компонент тайла
│   │   └── TilesContainer.vue  # Контейнер для тайлов
│   ├── App.vue                 # Главный компонент
│   ├── main.js                 # Точка входа
│   └── style.css               # Глобальные стили
├── package.json
└── vite.config.js
```

## 📦 Что входит в пакет

| Импорт | Назначение |
| --- | --- |
| `tiles-ui` | Vue 3 компоненты (`Tile`, `TilesContainer`, `Button`, `Dialog`, `Input`, `Toast`, `Skeleton`) |
| `tiles-ui/css` | Полный CSS-бандл |
| `tiles-ui/css.min` | Минифицированный CSS |
| `tiles-ui/styles/tile.css` | Отдельные исходники стилей |

## 💡 Пример использования

```vue
<script setup>
import { ref } from 'vue'
import { TilesContainer } from 'tiles-ui'

const tiles = ref([
  {
    size: '1x1',
    color: 'blue',
    type: 'number',
    number: 42,
    badge: 'New',
    clickable: true,
    onClick: () => console.log('Клик!')
  },
  {
    size: '2x1',
    color: 'green',
    type: 'title-value',
    title: 'Total Revenue',
    value: '$12,450'
  },
  {
    size: '2x2',
    color: 'purple',
    type: 'list',
    title: 'Recent Activities',
    items: [
      { text: 'New ticket', value: '2h ago', icon: icons.ticket }
    ]
  }
])
</script>

<template>
  <TilesContainer :tiles="tiles" :maxWidth="1200" />
</template>
```

## ⚙️ Пропсы TilesContainer

- `tiles` (Array, required) - массив тайлов для отображения
- `maxWidth` (String | Number, default: '100%') - максимальная ширина контейнера

**Пример:**

```vue
<TilesContainer :tiles="tiles" maxWidth="1200px" />
<TilesContainer :tiles="tiles" :maxWidth="900" />
```

## 🎯 Особенности реализации

- **CSS Grid с `grid-auto-flow: dense`** - автоматически заполняет пустоты между тайлами
- **Центрирование** - контейнер и сетка центрируются по горизонтали
- **Flexbox для контента** - гибкое распределение элементов внутри тайлов
- **CSS переменные** - для легкой кастомизации цветов
- **Градиенты** - второй цвет градиента на 20% темнее первого для единообразия
- **Компактные списки** - оптимизированные отступы для максимальной информативности
- **Адаптивный дизайн** - работает на разных размерах экранов

## 📝 Лицензия

MIT
