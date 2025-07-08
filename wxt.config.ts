import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'SalahExt',
    description:
      'A chrome and firefox extension meant to help with salah reminders.',
    permissions: ['geolocation', 'notifications'],
  },
});
