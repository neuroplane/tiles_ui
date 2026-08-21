# Tiles UI - CSS Framework

<!-- 
  Tiles UI - это CSS фреймворк для создания современных интерфейсов на основе тайлов.
  Можно использовать как чистый CSS фреймворк без Vue компонентов.
-->

## 📦 Установка

```bash
npm install tiles-ui
```

Либо подключите CSS с CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/tiles-ui/dist/css/tiles-ui.min.css">
```

## 🚀 Использование

### 1. Подключение CSS

```html
<link rel="stylesheet" href="https://unpkg.com/tiles-ui/dist/css/tiles-ui.min.css">
```

```css
@import 'tiles-ui/css';
```

```javascript
import 'tiles-ui/css'
```

### 2. Использование классов

#### Тайлы

<!-- Базовый пример тайла 1x1 с числом -->
```html
<div class="tiles-container">
  <!-- Тайл 1x1 с числом -->
  <div class="tile tile--1x1 tile--color-blue">
    <div class="tile__content tile__content--number">
      <span class="tile__number">42</span>
    </div>
  </div>
  
  <!-- Тайл 2x1 с заголовком и значением -->
  <div class="tile tile--2x1 tile--color-green">
    <div class="tile__badge">New</div>
    <div class="tile__content tile__content--title-value">
      <div class="tile__title">Total Revenue</div>
      <div class="tile__value">$12,450</div>
    </div>
  </div>
  
  <!-- Тайл 3x1 с заголовком и значением -->
  <div class="tile tile--3x1 tile--color-purple">
    <div class="tile__content tile__content--title-value">
      <div class="tile__title">Monthly Sales</div>
      <div class="tile__value">$45,230</div>
    </div>
  </div>
  
  <!-- Тайл 1x2 с заголовком и текстом -->
  <div class="tile tile--1x2 tile--color-teal">
    <div class="tile__badge">8</div>
    <div class="tile__content tile__content--title-text">
      <div class="tile__title">Notifications</div>
      <div class="tile__text">You have 5 new messages</div>
    </div>
  </div>
  
  <!-- Тайл 2x2 со списком -->
  <div class="tile tile--2x2 tile--color-cyan">
    <div class="tile__content tile__content--list">
      <div class="tile__title">Recent Activities</div>
      <ul class="tile__list">
        <li class="tile__list-item">
          <span class="tile__list-text">New ticket created</span>
          <span class="tile__list-value">2h ago</span>
        </li>
        <li class="tile__list-item">
          <span class="tile__list-text">Task completed</span>
          <span class="tile__list-value">5h ago</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

#### Кнопки

<!-- Основная кнопка -->
```html
<button class="button button--primary button--medium">Нажми</button>
```

<!-- Вторичная кнопка маленького размера -->
```html
<button class="button button--secondary button--small">Отмена</button>
```

<!-- Контурная кнопка большого размера -->
```html
<button class="button button--outline button--large">Подробнее</button>
```

<!-- Отключенная кнопка -->
```html
<button class="button button--primary button--disabled">Недоступно</button>
```

#### Диалоги

<!-- Полный пример диалогового окна -->
```html
<div class="dialog-overlay">
  <div class="dialog-container">
    <!-- Заголовок -->
    <div class="dialog-header">
      <h2 class="dialog-title">Заголовок диалога</h2>
    </div>
    
    <!-- Тело диалога -->
    <div class="dialog-body">
      <p>Содержимое диалогового окна. Здесь может быть любой контент.</p>
      <p>Диалог автоматически центрируется и имеет затемненный фон.</p>
    </div>
    
    <!-- Подвал с кнопками -->
    <div class="dialog-footer">
      <button class="button button--secondary">Закрыть</button>
      <button class="button button--primary">ОК</button>
    </div>
  </div>
</div>
```

## 🎨 Доступные классы

### Размеры тайлов
<!-- 
  Размеры тайлов определяются через grid span.
  Базовый размер 1x1 = 140px × 140px
-->
- `.tile--1x1` - 1×1 (140px × 140px) - 1 ячейка
- `.tile--2x1` - 2×1 (280px × 140px) - 2 ячейки по ширине
- `.tile--3x1` - 3×1 (420px × 140px) - 3 ячейки по ширине
- `.tile--1x2` - 1×2 (140px × 280px) - 2 ячейки по высоте
- `.tile--2x2` - 2×2 (280px × 280px) - 4 ячейки

### Цвета тайлов
<!-- 
  Каждый цвет использует градиент, где второй цвет на 20% темнее первого.
  Все цвета имеют белый текст по умолчанию.
-->
- `.tile--color-blue` - синий градиент
- `.tile--color-green` - зеленый градиент
- `.tile--color-red` - красный градиент
- `.tile--color-orange` - оранжевый градиент
- `.tile--color-purple` - фиолетовый градиент
- `.tile--color-pink` - розовый градиент
- `.tile--color-teal` - бирюзовый градиент
- `.tile--color-yellow` - желтый градиент
- `.tile--color-indigo` - индиго градиент
- `.tile--color-cyan` - циан градиент
- `.tile--color-lime` - лайм градиент
- `.tile--color-amber` - янтарный градиент

### Типы контента тайлов
<!-- 
  Различные варианты отображения контента внутри тайла.
  Каждый тип имеет свою структуру HTML.
-->
- `.tile__content--number` - только число (`.tile__number`)
- `.tile__content--title-value` - заголовок (`.tile__title`) и значение (`.tile__value`)
- `.tile__content--icon-value` - иконка (`.tile__icon`) и значение (`.tile__value`)
- `.tile__content--title-icon-value` - заголовок, иконка и значение
- `.tile__content--text` - только текст (`.tile__text`)
- `.tile__content--title-text` - заголовок и текст
- `.tile__content--list` - список элементов (`.tile__list`, `.tile__list-item`)

### Кнопки
<!-- 
  Кнопки имеют три варианта стиля и три размера.
  Все кнопки имеют uppercase текст и квадратные углы.
-->
- `.button--primary` - основная кнопка (синий фон)
- `.button--secondary` - вторичная кнопка (полупрозрачный фон)
- `.button--outline` - контурная кнопка (прозрачный фон с границей)
- `.button--small` - маленькая (8px 16px, шрифт 12px)
- `.button--medium` - средняя (12px 24px, шрифт 14px) - по умолчанию
- `.button--large` - большая (16px 32px, шрифт 16px)
- `.button--disabled` - отключенная кнопка

## 📐 Контейнер тайлов

<!-- 
  Контейнер использует CSS Grid с автоматическим заполнением пустот.
  На мобильных устройствах (до 600px) сетка переключается на 3 колонки.
-->
```html
<div class="tiles-container" style="max-width: 1200px;">
  <!-- Тайлы -->
</div>
```

## 🔤 Шрифты и типографика

<!-- 
  Фреймворк использует системные шрифты для лучшей производительности.
  Все размеры шрифтов оптимизированы для читаемости.
-->

### Семейство шрифтов
<!-- Системные шрифты для кроссплатформенной совместимости -->
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```

### Размеры шрифтов в тайлах

<!-- Заголовки тайлов -->
- `.tile__title` - **12px**, font-weight: 300, uppercase, opacity: 0.9

<!-- Значения в тайлах -->
- `.tile__value` (1x1) - **32px**, font-weight: 700
- `.tile__value` (2x1, 3x1, 2x2) - **42px**, font-weight: 700

<!-- Числа в тайлах -->
- `.tile__number` (1x1) - **48px**, font-weight: 700
- `.tile__number` (2x1, 3x1, 2x2) - **64px**, font-weight: 700

<!-- Текст в тайлах -->
- `.tile__text` (1x1) - **16px**, line-height: 1.4
- `.tile__text` (2x1, 3x1, 2x2) - **18px**, line-height: 1.4
- `.tile__text` (в title-text) - **14px**, line-height: 1.4

<!-- Элементы списка -->
- `.tile__list-item` - **14px**, line-height: 1.2
- `.tile__list-value` - **14px**, font-weight: 600

<!-- Бейджи -->
- `.tile__badge` - **12px**, font-weight: 900

### Размеры шрифтов в кнопках

<!-- Кнопки используют uppercase текст -->
- `.button--small` - **12px**, font-weight: 300
- `.button--medium` - **14px**, font-weight: 300 (по умолчанию)
- `.button--large` - **16px**, font-weight: 300

### Размеры шрифтов в диалогах

<!-- Заголовок диалога -->
- `.dialog-title` - **16px**, font-weight: 300, uppercase

<!-- Тело диалога -->
- `.dialog-body` - **16px**, line-height: 1.6, color: rgba(255, 255, 255, 0.9)

## 📱 Адаптивность

<!-- 
  На мобильных устройствах (max-width: 600px):
  - Сетка переключается на 3 колонки
  - Тайлы 2x1, 3x1 и 2x2 занимают всю ширину (3 колонки)
  - Gap уменьшается до 8px
  - Padding уменьшается до 10px
-->

## 🔧 Сборка CSS

<!-- Для сборки CSS фреймворка выполните: -->
```bash
pnpm run build:css
```

<!-- Результат будет в: -->
- `dist/css/tiles-ui.css` - полная версия
- `dist/css/tiles-ui.min.css` - минифицированная версия

## 📝 Полные примеры

### Пример 1: Dashboard с метриками

```html
<div class="tiles-container">
  <!-- Метрика 1 -->
  <div class="tile tile--1x1 tile--color-blue">
    <div class="tile__badge">New</div>
    <div class="tile__content tile__content--number">
      <span class="tile__number">42</span>
    </div>
  </div>
  
  <!-- Метрика 2 -->
  <div class="tile tile--2x1 tile--color-green">
    <div class="tile__content tile__content--title-value">
      <div class="tile__title">Total Revenue</div>
      <div class="tile__value">$12,450</div>
    </div>
  </div>
  
  <!-- Метрика 3 -->
  <div class="tile tile--3x1 tile--color-purple">
    <div class="tile__content tile__content--title-value">
      <div class="tile__title">Monthly Sales</div>
      <div class="tile__value">$45,230</div>
    </div>
  </div>
</div>
```

### Пример 2: Список активности

```html
<div class="tile tile--2x2 tile--color-cyan">
  <div class="tile__content tile__content--list">
    <div class="tile__title">Recent Activities</div>
    <ul class="tile__list">
      <li class="tile__list-item">
        <span class="tile__list-text">New ticket created</span>
        <span class="tile__list-value">2h ago</span>
      </li>
      <li class="tile__list-item">
        <span class="tile__list-text">Task completed</span>
        <span class="tile__list-value">5h ago</span>
      </li>
      <li class="tile__list-item">
        <span class="tile__list-text">User registered</span>
        <span class="tile__list-value">1d ago</span>
      </li>
    </ul>
  </div>
</div>
```

### Пример 3: Диалог с формой

```html
<div class="dialog-overlay">
  <div class="dialog-container">
    <div class="dialog-header">
      <h2 class="dialog-title">Подтверждение</h2>
    </div>
    <div class="dialog-body">
      <p>Вы уверены, что хотите выполнить это действие?</p>
    </div>
    <div class="dialog-footer">
      <button class="button button--secondary button--medium">Отмена</button>
      <button class="button button--primary button--medium">Подтвердить</button>
    </div>
  </div>
</div>
```

## 🎯 Особенности

<!-- 
  - CSS Grid с grid-auto-flow: dense для автоматического заполнения пустот
  - CSS переменные для цветов (легкая кастомизация)
  - Адаптивный дизайн с медиа-запросами
  - Градиенты для всех цветов (второй цвет на 20% темнее)
  - Квадратные углы
  - Uppercase текст для заголовков и кнопок
-->

## 📚 Дополнительная информация

<!-- См. файл `src/App.vue` для примеров использования с Vue компонентами. -->
<!-- См. файл `README.md` для полной документации проекта. -->
