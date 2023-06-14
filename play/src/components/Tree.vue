<script setup lang="ts">
import ZTree from '@z-k/components/tree/index'
import { Key, TreeOptions } from '@z-k/components/tree/src/tree'
import {ref} from 'vue'
function createData() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false // 这里isLeaf 为false 表示点击的时候动态的加载子节点
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}
const data = ref(createData())
const handleLoad=(node:TreeOptions)=>{
  // 内部肯定需要将展开的节点传递给我
  return new Promise<TreeOptions[]>((resolve,reject)=>{
    setTimeout(()=>{
      // 这个数据作为当前展开的node的children属性
      resolve([
        {
        label:nextLabel(node.label),
        key:node.key + nextLabel(node.label),
        isLeaf:false
      }
    ])
    },1000)
  })
  
}
const value = ref<Key[]>([])
</script>
  
<template>
  <ZTree 
    :data="data" 
    :on-load="handleLoad"
    v-model:selected-keys="value"
    selectable
    multiple
    ></ZTree>
</template>
<!-- :selectedKeys @update:selectedKeys -->
<style scoped>
</style>
