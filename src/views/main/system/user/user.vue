<template>
  <div class="user">
    <hy-form v-bind="searchFormConfig" v-model="formDate"></hy-form>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    HyForm
  },
  name: 'user',
  setup() {
    const formDate = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      searchFormConfig,
      formDate
    }
  }
})
</script>

<style scoped></style>
