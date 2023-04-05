import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './mian/system/system'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})

//登录后请求的数据存储在vuex和本地，但当页面发生刷新时，存储在vuex中的请求数据会消失.故通过编写函数setupStore将本地将数据重新存储到vuex，在main.ts中调用，每次刷新时都会执行
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

//定义login子模块的自己useStore,做类型限制
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
