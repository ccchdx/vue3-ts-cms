<template>
  <div class="user">
    <hy-form v-bind="searchFormConfig"></hy-form>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HyForm from '@/base-ui/form'

import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    HyForm
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
