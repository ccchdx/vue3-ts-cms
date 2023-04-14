<template>
  <div class="hy-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IListData } from './types'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      require: true
    },
    propList: {
      type: Array as PropType<IListData[]>,
      require: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style scoped></style>
