import '../src/style.css'

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0c1823' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
}

export default preview
