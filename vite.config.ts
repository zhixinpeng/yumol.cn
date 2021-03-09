import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import PurgeIcons from 'vite-plugin-purge-icons'
import Markdown from 'vite-plugin-md'
import { VitePWA } from 'vite-plugin-pwa'
import Prism from 'markdown-it-prism'
import Anchor from 'markdown-it-anchor'
import Toc from 'markdown-it-table-of-contents'
import ExternalLinks from 'markdown-it-external-links'
import { slugify } from './scripts/slugify'
import matter from 'gray-matter'
import { resolve } from 'path'
import fs from 'fs'
import { isDev } from './src/shared/index'

// https://vitejs.dev/config/
export default defineConfig({
  base: isDev ? '/' : 'https://cdn.jsdelivr.net/gh/zhixinpeng/yumol.cn@gh-pages/',
  build: {
    assetsInlineLimit: 1024 * 8
  },
  resolve: {
    alias: {
      '@/shared': resolve(__dirname, 'src/shared'),
      '@/styles': resolve(__dirname, 'src/styles')
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@iconify/iconify',
      'dayjs',
      'dayjs/plugin/localizedFormat',
      'dayjs/plugin/relativeTime',
      'dayjs/locale/zh-cn'
    ]
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),

    ...WindiCSS({
      safelist: 'prose prose-sm m-auto dark'
    }),

    Pages({
      pagesDir: 'src/views',
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const path = resolve(route.component.slice(1))
        const md = fs.readFileSync(path, 'utf-8')

        const { data } = matter(md)
        if (!data.date) {
          data.date = new Date(+new Date() + 8 * 3600 * 1000).toString()
        }
        data.date = new Date(data.date).toISOString().substr(0, 19).replace(/T/, ' ')
        data.date = data.date.replace(/-/g, '/')

        route.meta = Object.assign(route.meta || {}, {
          frontmatter: data
        })

        return route
      }
    }),

    ViteComponents({
      extensions: ['vue', 'md'],
      deep: true,
      customLoaderMatcher: (path) => path.endsWith('.md'),
      customComponentResolvers: ViteIconsResolver({ componentPrefix: '' })
    }),

    Icons(),

    PurgeIcons(),

    Markdown({
      wrapperComponent: 'detail',
      wrapperClasses: 'article-content prose mx-auto',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism)
        md.use(Anchor, {
          slugify,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
          permalinkAttrs: () => ({
            'aria-hidden': true
          })
        })
        md.use(Toc, {
          includeLevel: [2, 3, 4],
          containerClass: 'article-toc prose',
          slugify: (s: string) =>
            encodeURIComponent(
              String(s)
                .trim()
                .toLowerCase()
                .replace(/\s+|\.+/g, '-')
            )
        })
        md.use(ExternalLinks, {
          externalClassName: 'custom-external-link',
          externalTarget: '_blank',
          externalRel: 'noopener noreferrer',
          internalDomains: ['yumol.cn', 'idealin.cn']
        })
      }
    }),

    VitePWA({
      base: '/',
      scope: 'https://idealin.cn/',
      manifest: {
        name: '彭智鑫',
        short_name: '彭智鑫',
        start_url: 'https://idealin.cn/',
        theme_color: '#111111',
        icons: [
          {
            src: '/avatar_32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: '/avatar_128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/avatar_144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/avatar_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/avatar_256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/avatar_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
