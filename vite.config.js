import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import gql from 'vite-plugin-simple-gql'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), gql()],
  server: {
    open: true // 启动完成之后自动打开浏览器
  }
})
