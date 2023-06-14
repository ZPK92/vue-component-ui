import { ExtractPropTypes, PropType } from 'vue'

export type Size = 'small' | 'medium' | 'large'
export type Type =
  | 'primary'
  | 'success'
  | 'waring'
  | 'danger'
  | 'info'
  | 'default'
  | ''
export const buttonProps = {
  size: String as PropType<Size>,
  type: {
    type: String as PropType<Type>,
    validator: (type: string) => {
      return [
        'primary',
        'success',
        'waring',
        'danger',
        'info',
        'default',
        ''
      ].includes(type)
    }
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  }
} as const //这样就会变成仅读的

export const buttonEmits = {
  // 学习这里的技巧，就是如果返回的是void 会报错，那么使用下面的语句应用一下e
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent
}
export type buttonProps = ExtractPropTypes<typeof buttonProps>

export type ButtonEmits = typeof buttonEmits
