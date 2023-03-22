<template>
  <div class="nav-header">
    <div class="fold-menu" @click="handleFoldClick">
      <el-icon v-if="isFold"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      console.log('hhhhhh')
      //将菜单要折叠的信息发送给首页main.vue,首页改变菜单栏的宽度同时将信息发送给nav-menu.vue,nav-menu.vue组件接收后设置collapse
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>
<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
