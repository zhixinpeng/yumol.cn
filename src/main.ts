import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import RelativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/zh-cn'
import '@purge-icons/generated'

import 'windi.css'
import '@/styles/index.postcss'
import '@/styles/markdown.postcss'

export const createApp = ViteSSG(App, { routes }, ({ app, router, isClient }) => {
  dayjs.extend(LocalizedFormat)
  dayjs.extend(RelativeTime)
  dayjs.locale('zh-cn')

  if (isClient) {
    router.beforeEach(() => {
      NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
})
