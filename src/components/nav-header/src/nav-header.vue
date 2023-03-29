<template>
  <div class="nav-header">
    <div class="fold-menu" @click="handleFoldClick">
      <el-icon v-if="isFold"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import HyBreadcrumb from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    HyBreadcrumb
  },
  emits: ['foldChange'], //子传父
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      console.log('hhhhhh')
      //将菜单要折叠的信息发送给首页main.vue,首页改变菜单栏的宽度同时将信息发送给nav-menu.vue,nav-menu.vue组件接收后设置collapse
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据: [{name: , path: }],计算属性，动态变化
    const store = useStore()
    const breadcrumbs = computed(() => {
      const route = useRoute()
      const currentPath = route.path
      const userMenus = store.state.login.userMenus
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
