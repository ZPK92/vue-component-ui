<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>
<!--给组件加上名字： 方法1: -->
<!-- <script  lang="ts">
export default {
    name:'ZIcon'
}
</script> -->
<script lang="ts" setup>
/* 
这个方法无法实现导出组件名字
import { defineComponent } from 'vue';
defineComponent({
    name:'XXX'
})
*/
import { createNamespace } from '@z-k/utils/create'
import { computed, CSSProperties } from 'vue'
import { iconProps } from './icon'
// 给组件加上名字： 方法2:unplugin-vue-define-options使用这个插件来暴露组件名字
defineOptions({
  name: 'ZIcon'
})
// 原先在setup(props,{slot,emit,attrs,exposs}){} 现在可以用下面的方式
// defineProps()
// useSlots
// useAttrs
// defineEmits()
// defineExpose
const props = defineProps(iconProps)
const bem = createNamespace('icon')
const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {}
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})
</script>
