import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import dayjs from 'dayjs'

/**
 * 判断是否是文章页
 * @param route Vue 路由
 */
export const isArticle = (route: RouteRecordRaw | RouteLocationNormalizedLoaded): boolean => {
  if (!route.path || typeof route.path !== 'string') {
    return false
  }

  const ROUTE_NAME: string = 'article-page'
  const START_PATH: string = '/article/'

  return route.name !== ROUTE_NAME && route.path.startsWith(START_PATH)
}

/**
 * 判断是否是开发环境
 */
export const isDev: boolean = process.env.NODE_ENV === 'development'

/**
 * 文章日期显示文案
 * @param date 日期
 */
export const dateDisplay = (date: Date) => {
  const nowDate = dayjs(Date.now())
  const createDate = dayjs(+new Date(date))
  const diffDays: number = nowDate.diff(createDate, 'day')

  const dateAgo: string = dayjs(createDate).fromNow()

  return { diffDays, dateAgo }
}

/**
 * 返回随机列表
 * @param arr 列表
 */
export const shuffle = (arr: any[]): any[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))
    const item: any = arr[i]
    arr[i] = arr[j]
    arr[j] = item
  }

  return arr
}
