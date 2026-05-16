import Dialog from './Dialog.vue'
import Button from './Button.vue'
import { ref } from 'vue'

export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    modelValue: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
  },
}

export const Default = {
  render: (args) => ({
    components: { Dialog, Button },
    setup() {
      const showDialog = ref(true)
      return { showDialog, args }
    },
    template: `
      <div style="min-height: 300px; background: #0c1823; padding: 20px;">
        <Button @click="showDialog = true">Открыть диалог</Button>
        <Dialog v-model="showDialog" :title="args.title">
          <p>Это содержимое тела диалога. Здесь может быть любой контент.</p>
          <p>Диалоги автоматически центрируются и имеют затемненный фон.</p>
          <template #footer>
            <Button variant="secondary" @click="showDialog = false">Отмена</Button>
            <Button variant="primary" @click="showDialog = false">Подтвердить</Button>
          </template>
        </Dialog>
      </div>
    `,
  }),
  args: {
    title: 'Заголовок диалога',
    closeOnOverlayClick: true,
  },
}

export const WithoutFooter = {
  render: (args) => ({
    components: { Dialog, Button },
    setup() {
      const showDialog = ref(true)
      return { showDialog, args }
    },
    template: `
      <div style="min-height: 300px; background: #0c1823; padding: 20px;">
        <Button @click="showDialog = true">Открыть простой диалог</Button>
        <Dialog v-model="showDialog" :title="args.title">
          <p>Этот диалог не имеет определенного слота для подвала.</p>
          <p>Показывается только заголовок и содержимое тела.</p>
        </Dialog>
      </div>
    `,
  }),
  args: {
    title: 'Простой диалог',
    closeOnOverlayClick: true,
  },
}
