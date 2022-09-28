import { path, getDirname, fs } from '@vuepress/utils'
const __dirname = getDirname(import.meta.url)
import { defaultTheme } from '@vuepress/theme-default'
import { createPageFile, setFrontmatter, assignLocaleOptions } from './utils/index'
export const acmeTheme = (localeOptions = {}) => {
    assignLocaleOptions(localeOptions)
    return {
        name: 'vuepress-theme-acme',
        extends: defaultTheme(localeOptions),
        define: {},
        alias: Object.fromEntries(
            fs
                .readdirSync(path.resolve(__dirname, '../client/components'))
                .filter(file => file.endsWith('.vue'))
                .map(file => [`@theme/${file}`, path.resolve(__dirname, '../client/components', file)])
        ),
        async onInitialized(app) {
            let sourceDir = app.dir.source()
            // 创建分类标签时间轴文件页面
            createPageFile(sourceDir, localeOptions)
            // 所有.md文件设置frontmatter(标题、日期)
            setFrontmatter(sourceDir, localeOptions)
            const pageMap = app.pages.map(o => {
                return { data: o.data, path: o.path, title: o.title, frontmatter: o.frontmatter, permalink: o.permalink, filePathRelative: o.filePathRelative }
            })
            await app.writeTemp(`theme-acme/pagesData.js`, `export default ${JSON.stringify(pageMap)}`)
        },
        clientConfigFile: path.resolve(__dirname, '../client/config.js'),
        templateDev: path.resolve(__dirname, '../../templates/build.html'),
        templateBuild: path.resolve(__dirname, '../../templates/build.html')
    }
}
