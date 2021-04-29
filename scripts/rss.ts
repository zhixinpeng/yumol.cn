import { Feed, Item } from 'feed'
import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import config from '../src/shared/config'

interface Author {
  name: string
  email: string
  link: string
}

interface Post {
  [key: string]: any
  author: Author[]
  content: string
}

async function run() {
  const markdown = MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
  })

  const files = await fg('src/views/article/*.md')

  const posts: Post[] = (
    await Promise.all(
      files
        .filter((i) => !i.includes('index'))
        .map(async (i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)
          const html = markdown.render(content)

          return {
            ...data,
            content: html,
            author: [
              {
                name: 'pengzhixin',
                email: 'pengzhixin@live.cn',
                link: 'https://pengyumo.com'
              }
            ]
          }
        })
    )
  ).filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const feed = new Feed({
    title: config.title,
    description: config.description,
    id: config.website,
    link: config.website,
    image: config.avatar.big,
    favicon: `${config.website}/favicon.ico`,
    copyright: config.name,
    feedLinks: {
      json: `${config.website}/feed.json`,
      atom: `${config.website}/feed.atom`,
      rss: `${config.website}/feed.xml`
    },
    author: {
      name: config.name,
      email: config.email,
      link: config.website
    }
  })

  posts.forEach((i) => feed.addItem(i as Item))

  await fs.writeFile('./dist/feed.xml', feed.rss2(), 'utf-8')
  await fs.writeFile('./dist/feed.atom', feed.atom1(), 'utf-8')
  await fs.writeFile('./dist/feed.json', feed.json1(), 'utf-8')
}

run()
