<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
})
/* eslint-enable import/order */
</script>

<script setup lang="ts">
import { useSiteData } from '@vuepress/client'
import { isLinkHttp, isLinkWithProtocol } from '@vuepress/shared'
import { computed, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import type { NavLink } from '../../shared/index.js'

const props = defineProps({
  item: {
    type: Object as PropType<NavLink>,
    required: true,
  },
})

defineSlots<{
  before?: (props: Record<never, never>) => any
  after?: (props: Record<never, never>) => any
}>()

const route = useRoute()
const site = useSiteData()
const { item } = toRefs(props)

// if the link has http protocol
const hasHttpProtocol = computed(() => isLinkHttp(item.value.link))
// if the link has non-http protocol
const hasNonHttpProtocol = computed(
  () => !hasHttpProtocol.value && isLinkWithProtocol(item.value.link),
)
// resolve the `target` attr
const linkTarget = computed(() => {
  if (hasNonHttpProtocol.value) return undefined
  if (item.value.target) return item.value.target
  if (hasHttpProtocol.value) return '_blank'
  return undefined
})
// if the `target` attr is '_blank'
const isBlankTarget = computed(() => linkTarget.value === '_blank')
// is `<RouterLink>` or not
const isRouterLink = computed(
  () =>
    !hasHttpProtocol.value && !hasNonHttpProtocol.value && !isBlankTarget.value,
)
// resolve the `rel` attr
const linkRel = computed(() => {
  if (hasNonHttpProtocol.value) return undefined
  if (item.value.rel) return item.value.rel
  if (isBlankTarget.value) return 'noopener noreferrer'
  return undefined
})
// resolve the `aria-label` attr
const linkAriaLabel = computed(() => item.value.ariaLabel || item.value.text)

// should be active when current route is a subpath of this link
const shouldBeActiveInSubpath = computed(() => {
  const localeKeys = Object.keys(site.value.locales)
  if (localeKeys.length) {
    return !localeKeys.some((key) => key === item.value.link)
  }
  return item.value.link !== '/'
})
// if this link is active in subpath
const isActiveInSubpath = computed(() => {
  if (!shouldBeActiveInSubpath.value) {
    return false
  }
  return route.path.startsWith(item.value.link)
})

// if this link is active
const isActive = computed(() => {
  if (!isRouterLink.value) {
    return false
  }
  if (item.value.activeMatch) {
    return new RegExp(item.value.activeMatch).test(route.path)
  }
  return isActiveInSubpath.value
})
</script>

<template>
  <RouterLink
    v-if="isRouterLink"
    :class="{ 'router-link-active': isActive }"
    :to="item.link"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
  >
    <slot name="before" />
    {{ item.text }}
    <slot name="after" />
  </RouterLink>
  <a
    v-else
    class="external-link"
    :href="item.link"
    :rel="linkRel"
    :target="linkTarget"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
  >
    <slot name="before" />
    <NeoIcon :name="item.icon" :size="item.iconSize" />
    {{ item.text }}
    <AutoLinkExternalIcon v-if="isBlankTarget" />
    <slot name="after" />
  </a>
</template>
