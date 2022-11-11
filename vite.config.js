import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig((command, mode) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
    ],
    server: {
      host: true,
      port: 5100
    }
  }
})
