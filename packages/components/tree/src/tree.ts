import { ExtractPropTypes,PropType } from "vue"
export type Key = string | number
export interface TreeNode extends Required<TreeOptions>{
  level:number,
  rawNode:TreeOptions,
  children:TreeNode[],
  isLeaf:boolean,
 
}
export interface TreeOptions{
  label?:Key,
  key?:Key,
  isLeaf?:boolean,
  children?:TreeOptions[],
  [key:string]:unknown//任意接口
}
// vue组件的props
export const treeProps ={
  data:{
    type:Array as PropType<TreeOptions[]>,
    default:()=>[]
  },
  labelField:{
    type:String,
    default:'label'
  },
  keyField:{
    type:String,
    default:'key'
  },
  childrenField:{
    type:String,
    default:'children'
  },
  defaultExpandedKeys:{
    type:Array as PropType<Key[]>,
    default:()=>[]
  },
  onLoad:Function as PropType<(node:TreeOptions)=>Promise<TreeOptions[]>>,
  selectedKeys:{
    type:Array as PropType<Key[]>,
  },
  selectable:{
    type:Boolean,
    default:true
  },
  multiple:{
    type:Boolean,
    default:false,
  }
} as const 

export const treeNodeProps = {
  node:{
    type:Object as PropType<TreeNode>,
    required:true
  },
  expanded:{
    type:Boolean,
    required:true
  },
  loadingKeys:{
    type:Object as PropType<Set<Key>>,
    required:true
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  }
} as const
export const treeNodeEmitts={
  toggle:(node:TreeNode) => node,
  select: (node: TreeNode) => node
}
export const treeEmits={//内部发射的事件 用来同步响应式数据
  'update:selectedKeys':(keys:Key[])=>keys
}
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export  type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>