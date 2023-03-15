import { Module } from 'vuex'

import { accountLoginRequest } from '@/service/login/login'

import { IAccount } from '@/service/login/types'
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    }
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async accountLoginAction({ commit }, payload: IAccount) {
      //实现登录逻辑,发送登录请求
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
    }

    // phoneLoginAction({ commit }, payload: any) {
    //   //console.log(payload)
    // }
  }
}

export default loginModule
