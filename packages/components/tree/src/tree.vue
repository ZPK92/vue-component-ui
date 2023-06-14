<template>
  <div :class="bem.b()">
    <ZTreeNode  
    v-for="node in flattenTree" 
    :key="node.key" 
    :node="node"
    :expanded="isExpanded(node)"
    :loadingKeys="loadingKeysRef"
    @toggle="toggleExpand"
    @select="handleSelect"
    :selectedKeys="selectedKeys"
    ></ZTreeNode>
  </div>
</template>
<!-- 学习树的遍历   必须的会 -->
<script setup lang='ts'>
import {ref,watch,computed} from 'vue'
import { treeProps ,TreeNode,TreeProps,TreeOptions, Key, treeEmits} from './tree';
import { createNamespace } from '@z-k/utils/create';
import ZTreeNode from './treeNode.vue'
defineOptions({
  name:'z-tree'
})
const bem = createNamespace('tree')
const props = defineProps(treeProps)
// 有了props 要对用户的数据进行格式化 格式化一个固定的结果
const tree = ref<TreeNode[]>([])
function createOptions(key:string,label:string,children:string){
  return {
    getKey(node:TreeOptions){
      return node[key] as string
    },
    getLabel(node:TreeOptions){
      return node[label] as string
    },
    getChildren(node:TreeOptions){
      return node[children]as TreeOptions[]
    }
  }
}
const treeOptions = createOptions(props.keyField,props.labelField,props.childrenField)
// 将用户传入的数据进行格式化操作
function createTree(data:TreeOptions[],parent:TreeNode | null =null):any{
  function traversal(data:TreeOptions[],parent:TreeNode | null =null){
 
    return data.map(node=>{
      let children = treeOptions.getChildren(node) || []
      const treeNode:TreeNode = {
        key:treeOptions.getKey(node),
        label:treeOptions.getLabel(node),
        children:[],//默认为空 有孩子 再递归孩子  将其格式化成treeNode类型
        rawNode:node,
        level:parent ? parent.level+1 :0,
        isLeaf:node.isLeaf ?? children.length == 0 
      }
      if(children.length > 0){
        treeNode.children = traversal(children,treeNode)
      }
      return treeNode
    })
  }
  const result:TreeNode[]=traversal(data,parent)
  return result
}
// 监控数据变化 调用格式化方法 一上来先格式化一次
watch(
  ()=>props.data,
  (data:TreeOptions[])=>{
    tree.value = createTree(data)
  },
  {
    immediate:true
  }
)
// 希望将一颗树拍平，点击还能实现展开操作
// 默认
// 需要展开的key 有哪些
const expandedKeySet = ref(new Set(props.defaultExpandedKeys))
// 将树拍平 为后面实现虚拟列表  当前展开的节点，动态的计算
const flattenTree = computed(()=>{
  let expandedKeys = expandedKeySet.value
  let flattenNodes:TreeNode[]=[]//这个就是拍平后的结果
  const nodes = tree.value || [] //被格式化后的节点

  const stack:TreeNode[] = [] //用于遍历树的栈

  // [40 41]
  for(let i=nodes.length-1;i>=0;--i){
    stack.push(nodes[i])
  }
  // [41,40]
  while(stack.length){
    const node = stack.pop()
    if(!node) continue
    flattenNodes.push(node)
    if(expandedKeys.has(node.key)){
      const children = node.children // [40] 下面有 【30,31,32】
      if(children){
        for(let i=node.children.length-1;i>=0;--i){
          stack.push(node.children[i])
        }
      }
    }
  }
  return flattenNodes
})
function isExpanded(node:TreeNode):boolean{
  return expandedKeySet.value.has(node.key)
}
// 折叠功能
function collpase(node:TreeNode){
  
  expandedKeySet.value.delete(node.key)
}
const loadingKeysRef = ref(new Set<Key>())
function triggerLoading(node:TreeNode){
  // 这个节点需要异步加载
  if(!node.children.length && !node.isLeaf){
    // 如果没有加载过这个节点 就加载这个节点
    let loadingKeys = loadingKeysRef.value
    if(!loadingKeys.has(node.key)){
      loadingKeys.add(node.key) //防止多次加载
      const onLoad = props.onLoad
      if(onLoad){
        onLoad(node.rawNode).then(children=>{
          // 修改原来的节点
          node.rawNode.children = children
          // 更新自定义的node
          node.children = createTree(children,node)
          loadingKeys.delete(node.key)
        })
      }
    }
  }
}
// 展开功能
function expand(node:TreeNode){
  expandedKeySet.value.add(node.key)
  // 在这里实现加载逻辑  如果有正在加载了 就不能加载其他的了
  triggerLoading(node)
}
// 切换功能  让用户点击展开
function toggleExpand(node:TreeNode){
  const expandKeys = expandedKeySet.value
  // 如果当前这个节点 正在加载 不能收起
  if(expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)){
    collpase(node)
  }else{
    expand(node)
  }
}
// 实现选中节点
const emit = defineEmits(treeEmits)
const selectedKeysRef = ref<Key[]>([])
watch(()=>props.selectedKeys,value=>{
  if(value){
    selectedKeysRef.value = value
  }
},{
  immediate:true
})
function handleSelect(node:TreeNode){
  // 这样相当于将proxy解除掉了 
  let keys = Array.from(selectedKeysRef.value)
  if(!props.selectable)return
  if(props.multiple){
    let index = keys.findIndex(key=>key===node.key)
    if(index >-1){
      keys.splice(index,1)
    }else{
      keys.push(node.key) 
    }
   
  }else{
    if(keys.includes(node.key)){
      keys = []
    }else{
      keys = [node.key]
    }
  }
  emit('update:selectedKeys',keys)
}
</script>

<style  scoped>

</style>
