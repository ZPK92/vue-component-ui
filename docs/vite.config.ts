import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
// 帮助导出vue文件时 有名字
export default defineConfig({
  plugins: [DefineOptions()]
})
