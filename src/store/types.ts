import { ILoginState } from './login/types'
import { ISystemState } from './mian/system/types'

export interface IRootState {
  name: string
  age: number
}

//定义login子模块自己的useStore的类型
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}
export type IStoreType = IRootState & IRootWithModule
