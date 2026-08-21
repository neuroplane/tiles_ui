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

## 🎯 Особенности

- **Гибкие размеры тайлов**: 1×1, 2×1, 1×2, 2×2
- **Различные типы контента**: число, заголовок+значение, иконка+значение, список и другие
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
