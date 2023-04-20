import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.css'

import './service/axios_demo'
//import hyRequest from './service'

//全局映入
// import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'

//全局注册icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

//app.config.globalProperties.$filters全局挂载过滤器方法，template模板中使用时ts报错（找不到名称“$filters”）
//原因是我使用了volar插件，它会对template里面进行ts验证，因此需要写以下声明文件来写明类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

const app = createApp(App)

app.use(globalRegister)
setupStore()
app.use(router)
app.use(store)
//app.use(ElementPlus)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
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
