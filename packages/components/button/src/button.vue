<template>
   <button :class="[
    bem.b(),
    bem.m(type),
    bem.m(size),
    bem.is('round',round),
    bem.is('loading',loading),
    bem.is('loading',loading),

   ]"
   :type="nativeType"
   :disabled="disabled"
   @click="handleClick"
   >
   <template v-if="iconPlacement === 'left'">
      <loadingComponent v-if="loading"></loadingComponent>
      <template  v-else-if="slots.icon">
        <component :is="slots.icon" ></component>
      </template> 
   </template>
 
   <slot></slot>
   <template v-if="iconPlacement === 'right'">
      <loadingComponent v-if="loading"></loadingComponent>
      <template  v-else-if="slots.icon">
        <component :is="slots.icon" ></component>
      </template>
   </template>
   </button>
</template>

<script lang="ts" setup>
import {createNamespace} from '@z-k/utils/create'
import { useSlots } from 'vue';
import { buttonEmits, buttonProps } from './button';
import loadingComponent from './loading.vue'
// unplugin-vue-define-options插件
defineOptions({
  name:'ZButton',
  inheritAttrs:false,//无用的属性，不会加到dom上 会在attrs上
})

defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const slots = useSlots()
const bem = createNamespace('button')
const handleClick =(e:MouseEvent)=>{
  emit('click',e)
}
</script>