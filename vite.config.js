import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/postcss';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [
        (name) => {
          if (name === 'Icon') return { name: 'Icon', from: '@iconify/vue' };
        }
      ]
    })
  ],
});
