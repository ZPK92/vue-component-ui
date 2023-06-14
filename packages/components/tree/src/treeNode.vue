<template>
  <div :class="[bem.b(),bem.is('selected',isSelected)]">
    <div 
    :class="bem.e('content')" 
    :style="{paddingLeft:`${node.level*16}px`}"
    >
    <span 
      :class="[
        bem.e('expand-icon'),
        {expanded:expanded && !node.isLeaf},
        bem.is('leaf',node.isLeaf)
        ]"
      @click="handleExpand"
      >
      <ZIcon size="25" color="pink">
        <Switcher v-if="!loading"></Switcher>
        <Loading v-else></Loading>
      </ZIcon>
    </span>
    <!--  -->
    <span @click="handleSelected" :class="bem.e('label')">{{node?.label}}</span>
  </div>
  </div>
</template>

<script setup lang='ts'>
import {ref,computed} from 'vue'
import { treeNodeProps,treeNodeEmitts } from './tree';
import { createNamespace } from '@z-k/utils/create';
// import Switcher from './icon/Switcher.tsx'
import Switcher from './icon/Switcher'
import Loading from './icon/Loading'
import ZIcon from '@z-k/components/icon'
const bem = createNamespace('tree-node')

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmitts)
function handleExpand(){
  emit('toggle',props.node)
}
const loading=computed(()=>{
  return props.loadingKeys!.has(props.node?.key)
})
const isSelected = computed(()=>{
  return props.selectedKeys.includes(props.node.key)
})
function handleSelected(){
  emit('select',props.node)
}
</script>

<style  scoped>

</style>
