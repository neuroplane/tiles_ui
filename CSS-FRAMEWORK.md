# Tiles UI - CSS Framework

Tiles UI можно использовать как чистый CSS фреймворк без Vue компонентов.

## 📦 Установка

### Вариант 1: Через npm (если опубликовано)
```bash
npm install tiles-ui
```

### Вариант 2: Прямое использование CSS файла
Скопируйте файл `dist/css/tiles-ui.css` в ваш проект.

## 🚀 Использование

### 1. Подключение CSS

**В HTML:**
```html
<link rel="stylesheet" href="path/to/tiles-ui.css">
```

**В CSS/SCSS:**
```css
@import 'tiles-ui/dist/css/tiles-ui.css';
```

**В JavaScript (если используете bundler):**
```javascript
import 'tiles-ui/dist/css/tiles-ui.css'
```

### 2. Использование классов

#### Тайлы

**HTML структура:**
```html
<div class="tiles-container">
  <div class="tile tile--1x1 tile--color-blue">
    <div class="tile__content tile__content--number">
      <span class="tile__number">42</span>
    </div>
  </div>
  
  <div class="tile tile--2x1 tile--color-green">
    <div class="tile__badge">New</div>
    <div class="tile__content tile__content--title-value">
      <div class="tile__title">Total Revenue</div>
      <div class="tile__value">$12,450</div>
    </div>
  </div>
</div>
```

#### Кнопки

```html
<button class="button button--primary button--medium">Нажми</button>
<button class="button button--secondary button--small">Отмена</button>
<button class="button button--outline button--large">Подробнее</button>
```

#### Диалоги

```html
<div class="dialog-overlay">
  <div class="dialog-container">
    <div class="dialog-header">
      <h2 class="dialog-title">Заголовок</h2>
    </div>
    <div class="dialog-body">
      <p>Содержимое диалога</p>
    </div>
    <div class="dialog-footer">
      <button class="button button--secondary">Закрыть</button>
      <button class="button button--primary">ОК</button>
    </div>
  </div>
</div>
```

## 🎨 Доступные классы

### Размеры тайлов
- `.tile--1x1` - 1×1 (140px × 140px)
- `.tile--2x1` - 2×1 (280px × 140px)
- `.tile--1x2` - 1×2 (140px × 280px)
- `.tile--2x2` - 2×2 (280px × 280px)

### Цвета тайлов
- `.tile--color-blue`
- `.tile--color-green`
- `.tile--color-red`
- `.tile--color-orange`
- `.tile--color-purple`
- `.tile--color-pink`
- `.tile--color-teal`
- `.tile--color-yellow`
- `.tile--color-indigo`
- `.tile--color-cyan`
- `.tile--color-lime`
- `.tile--color-amber`

### Типы контента тайлов
- `.tile__content--number` - только число
- `.tile__content--title-value` - заголовок и значение
- `.tile__content--icon-value` - иконка и значение
- `.tile__content--title-icon-value` - заголовок, иконка и значение
- `.tile__content--text` - только текст
- `.tile__content--title-text` - заголовок и текст
- `.tile__content--list` - список

### Кнопки
- `.button--primary` - основная кнопка
- `.button--secondary` - вторичная кнопка
- `.button--outline` - контурная кнопка
- `.button--small` - маленькая
- `.button--medium` - средняя (по умолчанию)
- `.button--large` - большая
- `.button--disabled` - отключенная

## 📐 Контейнер тайлов

```html
<div class="tiles-container" style="max-width: 1200px;">
  <!-- Тайлы -->
</div>
```

## 🔧 Сборка CSS

Для сборки CSS фреймворка:

```bash
pnpm run build:css
```

Результат будет в `dist/css/tiles-ui.css` и `dist/css/tiles-ui.min.css`

## 📝 Примеры

См. файл `src/App.vue` для примеров использования с Vue компонентами.
