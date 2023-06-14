import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@z-k/theme-chalk/src/index.scss'

import ZIcon from '@z-k/components/icon'
import ZButton from '@z-k/components/button'
import ZInput from '@z-k/components/input'
import {FormItem,Form} from '@z-k/components/form'
const plugins = [ZIcon, ZButton,ZInput,FormItem,Form]
const app = createApp(App)
plugins.forEach(comp => { //组成全局组件
  app.use(comp)
})

app.mount('#app')
