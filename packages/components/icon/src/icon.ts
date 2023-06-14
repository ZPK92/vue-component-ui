// 这里面准备组件相关的属性 和 ts的类型
import { ExtractPropTypes, PropType } from "vue";

// vue props 类型校验 props 需要是仅读的  如何将一个对象属性变成仅读的 使用 as const 
export const iconProps = {
    size:[Number,String] as PropType<number | string>,
    color:String as  PropType<string>,
} as const 
// 获取props的类型
export type IconProps = ExtractPropTypes<typeof iconProps>

