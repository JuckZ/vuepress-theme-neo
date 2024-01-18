import { defaultTheme } from './defaultTheme'
import { path, getDirname, fs } from '@vuepress/utils'
import { extraLocaleOptions, prepareCreatePageFile, preparePagesFrontmatter, prepareSidebarData } from './utils/index.js'

const __dirname = getDirname(import.meta.url);
export const neoTheme =
    (options, legacy = false) =>
    app => {
        prepareSidebarData(app, options)
        const { plugins = {}, sidebarSorter } = legacy
        return {
            name: 'vuepress-theme-neo',
            extends: defaultTheme(options),
            define: {},
            // 组件别名定义
            alias: Object.fromEntries(
                fs
                    .readdirSync(path.resolve(__dirname, '../client/components'))
                    .filter(file => file.endsWith('.vue'))
                    .map(file => [`@theme/${file}`, path.resolve(__dirname, '../client/components', file)])
            ),
            onPrepared(app) {
                Promise.all([
                    // 创建 分类、标签、归档、文件页
                    prepareCreatePageFile(app, options),
                    // 生成文章页 frontmatter
                    preparePagesFrontmatter(app, options),
                    // 额外名称配置(随笔 时间轴 归类等)
                    extraLocaleOptions(options),
                    // 生成侧边栏数据
                    // prepareSidebarData(app, options),
                ]).then(() => void 0)
            },
            clientConfigFile: path.resolve(__dirname, '../client/neoConfig.js'),
            templateDev: path.resolve(__dirname, '../../templates/build.html'),
            templateBuild: path.resolve(__dirname, '../../templates/build.html')
        }
    }
