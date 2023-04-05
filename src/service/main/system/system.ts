import hyRequest from '@/service'
import { IDataType } from '@/service/types'

//发送请求，获取user页面数据
export function getPageListDate(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
