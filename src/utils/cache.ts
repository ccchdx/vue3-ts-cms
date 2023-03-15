//处理账号密码
class LocalCache {
  //保存到本地
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  //获从本地获取
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  //从本地删除
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  //清除
  clearCache() {
    window.localStorage.clear()
  }
}
//导出实例
export default new LocalCache()
