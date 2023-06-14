<template>
  <div :class="[
    bem.b(),
    bem.is('success',validateState==='success'),
    bem.is('error',validateState==='error')
    ]">
    <label :class="bem.e('label')">
      <slot name="label">{{label}}</slot>
    </label>
    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">
        <slot name="error">{{validateMessage}}</slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import{createNamespace}from '@z-k/utils/create'
import {reactive,ref,provide,toRefs,computed,inject, onMounted} from 'vue'
import {FormItemContext, FormItemValidateState,formItemProps,formItemContextKey, FormItemRule, Arrayable } from './form-item'
import { FormContextKey } from './form'
import AsyncValidator, { Value } from 'async-validator'
const bem = createNamespace('form-item')
defineOptions({
  name:'ZFormItem'
})
const FormContext = inject(FormContextKey)
const  converArray = (rules:Arrayable<FormItemRule> | undefined):FormItemRule[]=>{
  return rules ? Array.isArray(rules)
    ? rules
    : [rules]
    : []
}
const getRuleFiltered = (trigger:string)=>{
  const rules = _rulse.value
  return rules.filter(rule=>{
    if(!rule.trigger || !trigger) return true
    if(Array.isArray(rule.trigger)){
      return rule.trigger.includes(trigger)
    }else{
      return rule.trigger === trigger
    }
  })
}
const onValidationSuccesseded = ()=>{
  validateState.value = 'success'
  validateMessage.value = ''
}
const onValidationFailed = (err:Value)=>{
  validateState.value = 'error'
  const {errors} = err
  
  validateMessage.value = errors ? errors[0].message :''
}
const validate:FormItemContext['validate'] = async(trigger:string,callback?)=>{
 const rules =  getRuleFiltered(trigger)
 const modelName = props.prop!
  const validator = new AsyncValidator({
    [modelName]:rules
  })
  const model = FormContext?.model!
  return validator.validate({
    [modelName]:model[modelName]
  })
  .then(()=>{
    console.log('成功');
    onValidationSuccesseded()
  })
  .catch((err)=>{
    console.dir('失败',err);
    onValidationFailed(err)
    return Promise.reject(err)
  })
}
const props = defineProps(formItemProps)
const context:FormItemContext =reactive({
  ...props,
  validate
})
provide('form-item',context)
const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('')
const _rulse = computed(()=>{
  const myRules:FormItemRule[] =converArray(props.rules)
  const formRules = FormContext?.rules
  if(formRules && props.prop){
    const _temp = formRules[props.prop]
    if(_temp){
      myRules.push(...converArray(_temp))
    }
  }
  return myRules
})
onMounted(() => {
  FormContext?.addFiele(context)
}),
</script> 