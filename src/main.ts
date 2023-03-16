import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.css'

import './service/axios_demo'
//import hyRequest from './service'

//全局映入
// import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

app.use(router)
app.use(store)
//app.use(ElementPlus)
app.mount('#app')
setupStore()
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     // method: 'GET',
//     showLoading: false
//     // interceptors: {
//     //   requestInterceptor: (config) => {
//     //     console.log('单独请求的config')
//     //     return config
//     //   },
//     //   responseInterceptor: (res) => {
//     //     console.log('单独响应的response')
//     //     return res
//     //   }
//     // }
//   })
//   .then((res) => {
//     console.log(res.data)
//     //console.log(res.returnCode)
//     // console.log(res.success)
//   })
