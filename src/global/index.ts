import { App } from 'vue'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  app.use(registerProperties)
}

// import 'element-plus/theme-chalk/base.css'
// import {
//   ElButton,
//   ElTable,
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge
// } from 'element-plus/lib/components'

// const components = [
//   ElButton,
//   ElTable,
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge
// ]
// export function registerApp(app: App): void {
//   for (const cpn of components) {
//     app.component(cpn.name, cpn)
//   }
// }
