import { path } from '@vuepress/utils'
import { defaultTheme } from '@vuepress/theme-default'
import type { Theme } from '@vuepress/core'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
// const sourceDir = path.join(__dirname, '..', '..', '..', '..') // docs相对路径
const { useSitePages, useFrontmatter } = require('./node_utils/setSitePages')

export const localTheme = (options: DefaultThemeOptions): Theme => {
    return {
        name: 'vuepress-theme-acme',
        extends: defaultTheme(options),
        // define: {
        //     __SITEPAGES__: sitePages
        // },
        alias: app => ({
            '@vuepress/theme-acme/temp': app.dir.temp(`theme-acme/site-pages.js`)
        }),
        async onPrepared(app) {
            // 给.md文件的frontmatter
            let sourceDir = app.dir.source()
            useFrontmatter(sourceDir, options)
            const sitePagesData = await useSitePages(sourceDir)
            const sitePagesContent = `export const sitePagesData = '${JSON.stringify(sitePagesData)}'`
            app.writeTemp(`theme-acme/site-pages.js`, sitePagesContent)
        },
        layouts: {
            404: path.resolve(__dirname, '../client/layouts/404.vue'),
            Layout: path.resolve(__dirname, '../client/layouts/Layout.vue')
        },
        clientConfigFile: path.resolve(__dirname, '../client/config.js')
    }
}
