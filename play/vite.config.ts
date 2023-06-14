/*
 * @Version: 1.0
 * @Author: ZPK
 * @Date: 2023-01-11 09:57:54
 * @LastEditors: ZPK
 * @LastEditTime: 2023-01-11 14:02:50
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from "unplugin-vue-define-options/vite"
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    vue(),
    DefineOptions()
  ],
})
