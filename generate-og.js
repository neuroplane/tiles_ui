import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Открываем локальный HTML файл
  await page.goto('file://' + join(__dirname, 'public', 'generate-og.html'));
  
  // Ждем загрузки canvas
  await page.waitForSelector('canvas');
  
  // Делаем скриншот canvas
  const canvas = await page.$('canvas');
  await canvas.screenshot({
    path: join(__dirname, 'public', 'og-image.png'),
    type: 'png'
  });
  
  await browser.close();
  console.log('✓ og-image.png создан успешно! (1200x630px)');
}

generateOGImage().catch(err => {
  console.error('Ошибка:', err);
  process.exit(1);
});
