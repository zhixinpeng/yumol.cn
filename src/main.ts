import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import '@purge-icons/generated'

import 'windi.css'
import '@/styles/index.postcss'
import '@/styles/markdown.postcss'

export const createApp = ViteSSG(App, { routes }, ({ app, router, isClient }) => {
  if (isClient) {
    router.beforeEach(() => {
      NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
})
