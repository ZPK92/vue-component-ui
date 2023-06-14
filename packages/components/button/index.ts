import _Button from './src/button.vue'
import { withInstall } from '@z-k/utils/with-install'
const Button = withInstall(_Button)
export default Button
export * from './src/button'
export type ButtonInstance = InstanceType<typeof Button>
declare module 'vue' {
  export interface GlobalComponents {
    ZButton: typeof Button
  }
}
