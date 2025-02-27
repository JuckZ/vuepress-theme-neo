import { getDirname, path } from "@vuepress/utils";

import { rollupBundle } from "../../scripts/rollup.js";

const __dirname = getDirname(import.meta.url);

export default [
  ...rollupBundle("node/index", {
    external: ["bcrypt-ts/node", "chokidar", "nodejs-jieba"],
    moduleSideEffects: () => false,
  }),
  ...rollupBundle(
    {
      base: "client",
      target: "bundle",
      files: ["export", "modules/blog/export", "modules/encrypt/export"],
    },
    {
      alias: [
        {
          find: /^@theme-hope\/(.*)/,
          replacement: path.resolve(__dirname, "./src/client/$1.ts"),
        },
      ],
      external: [
        "@vuepress/plugin-external-link-icon/client",
        "@vuepress/plugin-theme-data/client",
        "bcrypt-ts/browser",
        "body-scroll-lock",
        "vuepress-plugin-blog2/client",
        "vuepress-plugin-comment2/pageview",
        "vuepress-plugin-md-enhance/SlidePage",
        "vuepress-plugin-reading-time2/client",
        "vuepress-shared/noopModule",
        /\.jpg$/,
      ],
      dts: false,
      moduleSideEffects: (id) =>
        [
          "balloon-css/balloon.css",
          "vuepress-shared/client/styles/message.scss",
        ].includes(id),
    },
  ),
];
