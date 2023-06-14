<template>
  <form>
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import{createNamespace}from '@z-k/utils/create'
import { formProps,FormContextKey } from './form';
import {provide} from 'vue'
import { FormContext } from './form';
import { FormItemContext } from './form-item';
import { Values } from 'async-validator';
const bem = createNamespace('form')
defineOptions({
  name:'ZForm'
})
const props = defineProps(formProps)
const fields:FormItemContext[] = []
// 在父级中调用所有儿子的校验方法
const validate = async(callback?:(valid:boolean,fields?:Values)=>void)=>{
  let errors:Values = {}
  for(const field of fields){
    try {
      await field.validate('')
    } catch (error) {
      errors={
        ...errors,
        ...(error as Values).fields
      }
    }
  }
  if(Object.keys(errors).length === 0){
    return callback?.(true)
  }else{
    if(callback){
      callback?.(false,errors)
    }else{
      return Promise.reject(errors)
    }
  }
}

const addField:FormContext['addFiele'] = (context)=>{
  fields.push(context)
}
const context = {
  ...props,
  addField
}
provide(FormContextKey,context)
defineExpose({
  validate
})
</script>