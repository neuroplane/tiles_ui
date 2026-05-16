import Tile from './Tile.vue'

export default {
  title: 'Components/Tile',
  component: Tile,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['1x1', '2x1', '3x1', '1x2', '2x2'],
    },
    color: {
      control: 'select',
      options: ['blue', 'green', 'red', 'orange', 'purple', 'pink', 'teal', 'yellow', 'indigo', 'cyan', 'lime', 'amber'],
    },
    type: {
      control: 'select',
      options: ['default', 'number', 'title-value', 'icon-value', 'title-icon-value', 'text', 'title-text', 'list', 'chart', 'progress', 'image', 'timer'],
    },
    badge: { control: 'text' },
    clickable: { control: 'boolean' },
    number: { control: 'number' },
    title: { control: 'text' },
    value: { control: 'text' },
    text: { control: 'text' },
    progressPercent: { control: { type: 'range', min: 0, max: 100 } },
    chartData: { control: 'object' },
    timerTarget: { control: 'text' },
  },
}

export const Number = {
  args: {
    size: '1x1',
    color: 'blue',
    type: 'number',
    number: 42,
    badge: 'Новое',
  },
}

export const TitleValue = {
  args: {
    size: '2x1',
    color: 'green',
    type: 'title-value',
    title: 'Общий доход',
    value: '12 450 ₽',
    badge: '12%',
  },
}

export const IconValue = {
  args: {
    size: '1x1',
    color: 'purple',
    type: 'icon-value',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    },
    value: '99',
  },
}

export const List = {
  args: {
    size: '2x2',
    color: 'cyan',
    type: 'list',
    title: 'Недавние действия',
    items: [
      { text: 'Создан новый тикет', value: '2ч назад' },
      { text: 'Задача выполнена', value: '5ч назад' },
      { text: 'Пользователь зарегистрирован', value: '1д назад' },
      { text: 'Получен платеж', value: '2д назад' },
    ],
  },
}

export const Chart = {
  args: {
    size: '2x1',
    color: 'teal',
    type: 'chart',
    title: 'Продажи за неделю',
    chartData: [30, 45, 35, 50, 55, 40, 65],
    chartValue: '+12%',
  },
}

export const Progress = {
  args: {
    size: '2x1',
    color: 'orange',
    type: 'progress',
    title: 'Статус проекта',
    progressPercent: 75,
  },
}

export const Timer = {
  args: {
    size: '2x1',
    color: 'red',
    type: 'timer',
    title: 'Осталось времени',
    timerTarget: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 5 + 1000 * 60 * 30,
  },
}

export const Clickable = {
  args: {
    size: '2x1',
    color: 'pink',
    type: 'title-value',
    title: 'Нажми меня',
    value: 'Действие',
    clickable: true,
  },
}
