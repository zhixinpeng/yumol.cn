import { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * 判断是否是移动端
 */
export const isMobile = /iPhone|phone|android|iPod|pad|iPad/i.test(
  navigator.userAgent.toLowerCase()
)

/**
 * 判断是否是文章页
 * @param route Vue 路由
 */
export const isArticle = (route: RouteLocationNormalizedLoaded): boolean => {
  if (!route.path || typeof route.path !== 'string') {
    return false
  }

  const ROUTE_NAME: string = 'article-page'
  const START_PATH: string = '/article/'

  return route.name !== ROUTE_NAME && route.path.startsWith(START_PATH)
}
