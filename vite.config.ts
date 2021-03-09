import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import PurgeIcons from 'vite-plugin-purge-icons'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import Anchor from 'markdown-it-anchor'
import Toc from 'markdown-it-table-of-contents'
import ExternalLinks from 'markdown-it-external-links'
import { slugify } from './scripts/slugify'
import matter from 'gray-matter'
import { resolve } from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
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
    })
  ]
})
