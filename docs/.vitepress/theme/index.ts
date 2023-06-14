// 添加vite.config.ts 让其也支持defineOptions
import DefaultTheme from 'vitepress/theme'
import '@z-k/theme-chalk/src/index.scss'
import ZIcon from '@z-k/components/icon'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon) //在vitepress中 注册全局组件
  }
}
