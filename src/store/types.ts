import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

//定义login子模块自己的useStore的类型
export interface IRootWithModule {
  login: ILoginState
}
export type IStoreType = IRootState & IRootWithModule
