import _Tree from './src/tree.vue'
import { withInstall } from '@z-k/utils/with-install'
const Tree = withInstall(_Tree)
export default Tree 

export * from './src/tree.vue'

export type IconInstance = InstanceType<typeof Tree> 

declare module 'vue' {
  export interface GlobalComponents {
    ZTree: typeof Tree
  }
}

export * from './src/tree'