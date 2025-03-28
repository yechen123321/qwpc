// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    // https: {  // 添加 HTTPS 配置
    //   key: fs.readFileSync('certs/localhost+3-key.pem'),
    //   cert: fs.readFileSync('certs/localhost+3.pem')
    // }
  }
})