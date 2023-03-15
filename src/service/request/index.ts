import axios from 'axios'
import type {
  AxiosInstance
  // AxiosRequestConfig
  // AxiosResponse,
  // InternalAxiosRequestConfig
} from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
//
// interface HYRequestInterceptors {
//   requestInterceptor?: (
//     config: InternalAxiosRequestConfig
//   ) => InternalAxiosRequestConfig
//   requestInterceptorCatch?: (error: any) => any
//   responseInterceptor?: (res: AxiosResponse) => AxiosResponse
//   responseInterceptorCatch?: (error: any) => any
// }

// interface HYRequestConfig extends AxiosRequestConfig {
//   interceptors?: HYRequestInterceptors
// }
const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HYRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors

    //1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //console.log('请求成功')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        //console.log('请求失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        //console.log('响应成功')
        //将loading移除
        setTimeout(() => {
          this.loading?.close()
        }, 1000)

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        //console.log('响应失败')
        //将loading移除
        this.loading?.close()

        if (err.response.status === 404) {
          //console.log('404的错误')
        }
        return err
      }
    )
  }
  //request方法
  //这里的configs写为config即可，加s是我自己用来区分（configs是指main.ts里实例调用request方法时传进来的参数，而不是实例里的参数）
  //将configs的类型由AxiosRequestConfig改为HYRequestConfig(AxiosRequestConfig的扩展，新增了interceptors属性)，这样在main.ts里实例调用request方法时可多传一个interceptors
  request<T>(configs: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (configs.interceptors?.requestInterceptor) {
        configs = configs.interceptors.requestInterceptor(configs as any)
      }
      //判断是否要显示loading
      if (configs.showLoading === false) {
        this.showLoading = configs.showLoading
      }

      this.instance
        .request<any, T>(configs)
        .then((res) => {
          if (configs.interceptors?.responseInterceptor) {
            res = configs.interceptors.responseInterceptor(res)
          }

          //将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          //将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          //将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
