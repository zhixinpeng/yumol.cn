import autoRoutes from 'pages-generated'

export const routes = autoRoutes.map((route) => {
  return {
    ...route,
    alias: route.path.endsWith('/') ? `${route.path}index.html` : `${route.path}.html`
  }
})