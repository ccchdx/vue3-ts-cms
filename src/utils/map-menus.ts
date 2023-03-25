import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRouters(userMenus: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //require.context用于加载文件,这里是将../router/main下面的每个.ts文件都导入到routeFiles
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    //commonjs
    console.log(key)
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log(allRoutes)

  //2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}
