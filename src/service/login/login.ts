import hyRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = './login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
//账号登录时发送请求
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
    //showLoading: false
  })
}

//根据用户id请求用户信息
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

//请求用户菜单
export function requestMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
