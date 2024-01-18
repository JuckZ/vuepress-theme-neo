import { usePageFrontmatter } from "@vuepress/client";
import { defineComponent, h } from "vue";
import { VPLink, entries, generateIndexFromHash } from "vuepress-shared/client";
import { useTagMap } from "@theme-hope/modules/blog/composables/index";
import "../styles/tag-list.scss";
export default defineComponent({
    name: "TagList",
    setup() {
        const frontmatter = usePageFrontmatter();
        const tagMap = useTagMap();
        const isActive = (name) => name === frontmatter.value.blog?.name;
        return () => h("ul", { class: "tag-list-wrapper" }, entries(tagMap.value.map)
            // sort from more to less
            .sort(([, a], [, b]) => b.items.length - a.items.length)
            .map(([tag, { path, items }]) => h("li", {
            class: [
                "tag",
                // TODO: magic number 9 is tricky here
                `tag${generateIndexFromHash(tag, 9)}`,
                { active: isActive(tag) },
            ],
        }, h(VPLink, { to: path }, () => [
            tag,
            h("span", { class: "tag-num" }, items.length),
        ]))));
    },
});
//# sourceMappingURL=TagList.js.map