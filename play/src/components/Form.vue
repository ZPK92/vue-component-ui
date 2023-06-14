<script setup lang='ts'>
import {reactive,ref} from 'vue'
import {FormInstance} from '@z-k/components/form'
const state = reactive({username:'',password:''})

const formRef = ref<FormInstance>()
</script>
<template>
 <ZForm 
 ref="formRef"
 :model="state" 
 :rules="{
  username:{
    min:6,
    max:10,
    message:'6-10',
    trigger:['change','blur']
  }
 }">
  <ZFormItem prop="username" label="请输入" :rules="[
    {required:true,message:'请输入用户名',trigger:'blur'},
  ]">
    <ZInput placeholder="请输入用户名" v-model="state.username"></ZInput>
    <template #label>用户名</template>
  </ZFormItem>
 </ZForm>
</template>



