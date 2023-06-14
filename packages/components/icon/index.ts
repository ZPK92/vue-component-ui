// 用来整合组件的 最终实现导出组件
import _Icon from './src/icon.vue'
import { withInstall } from '@z-k/utils/with-install'
const Icon = withInstall(_Icon)
export default Icon //可以通过app.use来使用  也可以通过import方式单独使用

export * from './src/icon'

// InstanceType ts内置的 这样的话，通过ref 就可以获取到数据带有类型
export type IconInstance = InstanceType<typeof Icon> //让用户可以通过ref使用组件的类型 还需要增加isstance实例类型

// 为了在使用ZIcon的时候，可以有组件提示 (在模板中) 需要配合vscode插件 volar
// 目的：添加类型 可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    ZIcon: typeof Icon
  }
}
