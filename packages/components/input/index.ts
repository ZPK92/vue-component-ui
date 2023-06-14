import { withInstall } from '@z-k/utils/with-install'
import _Input from './src/input.vue'
const Input = withInstall(_Input)
export default Input
// export * from './src/input'
export type {InputProps} from './src/input'
export type InputInstance = InstanceType<typeof Input>
declare module 'vue' {
  export interface GlobalComponents {
    ZInput: typeof Input
  }
}
