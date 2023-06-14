<script setup lang="ts">
// 查看网站去了解这个库
import {Accessibility,AddCircle} from '@vicons/ionicons5'
import TestTree from './Tree.vue'
import {ref,reactive} from 'vue'
const handleclick = ()=>{
  alert('click')
}
function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(20 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      label: createLabel(level), // 显示的内容
      key, // 为了唯一性
      children: createData(level - 1, key) // 孩子
    }
  })
}
function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
const data = ref(createData())
const username = ref('hello')
const placeholder = ref('请输入内容')
const handleFocus = (e:FocusEvent)=>{
  console.log('focus');
}
const handleBlur = (e:FocusEvent)=>{
  console.log('blur');
}
</script>
  
<template>
  <ZButton size="medium" type="primary" round  icon-placement="right" @click="handleclick">
    <template #icon>
      <ZIcon :size="20" color="red" ref="InconInstance">
        <Accessibility></Accessibility>
      </ZIcon>
    </template>
    loading
  </ZButton>
  <!-- 在使用树组件的时候 会传递一个树形的结构 -->
  <!-- <ZTree 
    :data="data" 
    label-filed="label" 
    key-filed="key" 
    children-field="children"
    :default-expanded-keys="['41']"
    ></ZTree> -->
    <TestTree></TestTree>
    <div>-------------</div>
    <ZInput 
    v-model="username"
    @blur="handleBlur"
    @focus="handleFocus"
    :placeholder="placeholder"
    :show-password="true"
    :clearable="true"
    >
      <template #prepend>珠1峰</template>
      <template #prefixIcon>
        <ZIcon :size="20" color="red" ref="InconInstance">
          <AddCircle></AddCircle>
        </ZIcon>
      </template>
      <template #sufixIcon>嘟嘟</template>
      <template #append>滴滴</template>
    </ZInput>
</template>

<style scoped>
</style>
