import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'

let firstMenu: any = null

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
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

export { firstMenu }

//获取面包屑数据：根据当前菜单选中的选项的路径，在userMenus中获取对应的menu和menu的parent，将两者的name和url保存在数组中。
//方法和下面的pathMapToMenu差不多，故在其函数中增加一个可选变量
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

//  /main/system/role  -> type===2 对应menu.
//根据当前菜单选中的选项的路径，在userMenus中获取对应的menu。nav-menu.vue中的e-menu标签的属性default-active即可根据menu.id实现动态变化，这样当页面刷新时，仍会选中刷新前菜单选中的选项
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath) //路径和菜单选中的映射关系
      if (findMenu) {
        // breadcrumbs?.push({ name: menu.name, path: menu.url })
        // breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
