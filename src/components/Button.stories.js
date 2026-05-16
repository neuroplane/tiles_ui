import Button from './Button.vue'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
}

export const Primary = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    default: 'Основная кнопка',
  },
}

export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'medium',
    disabled: false,
    default: 'Вторичная кнопка',
  },
}

export const Outline = {
  args: {
    variant: 'outline',
    size: 'medium',
    disabled: false,
    default: 'Контурная кнопка',
  },
}

export const Small = {
  args: {
    variant: 'primary',
    size: 'small',
    disabled: false,
    default: 'Маленькая кнопка',
  },
}

export const Large = {
  args: {
    variant: 'primary',
    size: 'large',
    disabled: false,
    default: 'Большая кнопка',
  },
}

export const Disabled = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
    default: 'Отключенная кнопка',
  },
}
