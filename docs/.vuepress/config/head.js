export default [
    ['link', { rel: 'icon', href: 'https://feyoudao.oss-cn-hongkong.aliyuncs.com/site/favicon.ico' }],
    ['script', { src: 'https://at.alicdn.com/t/c/font_3645957_hl9uwk46i7q.js' }],
    ['script', { async: true, src: 'https://analytics.umami.is/umami.js', 'data-website-id': '52cfb7a9-9d03-428b-917c-dc7c5b7999a5' }],

    // 在 Chrome 85 版本中，为了保护用户的隐私，默认的 Referrer Policy 则变成了 strict-origin-when-cross-origin。
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    [
        'meta',
        {
            name: 'keywords',
            content:
                '前端有道、技术博客、前端、前端开发、前端博客、前端框架、web前端、前端面试、技术文档、学习、面试、JavaScript、js、es6、typeScript、ts、vue、python、css3、html5、node、git、github、markdown、vuepress、react'
        }
    ]
]
