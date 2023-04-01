<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'

import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    PageSearch
  },
  name: 'user',
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
