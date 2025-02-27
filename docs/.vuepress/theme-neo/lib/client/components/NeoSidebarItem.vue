<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue'
import NeoSidebarItem from '@theme/NeoSidebarItem.vue'
import DropdownTransition from '@theme/DropdownTransition.vue'
import { useToggle } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ResolvedSidebarItem } from '../../shared/index.js'
import { isActiveSidebarItem } from '../utils/index.js'

const props = defineProps({
  item: {
    type: Object as PropType<ResolvedSidebarItem>,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
})

const { item, depth } = toRefs(props)
const route = useRoute()
const router = useRouter()

const isActive = computed(() => isActiveSidebarItem(item.value, route))
const itemClass = computed(() => ({
  'sidebar-item': true,
  'sidebar-heading': depth.value === 0,
  'active': isActive.value,
  'collapsible': item.value.collapsible,
}))

const isOpenDefault = computed(() =>
  item.value.collapsible ? isActive.value : true,
)
const [isOpen, toggleIsOpen] = useToggle(isOpenDefault.value)
const onClick = (e: Event): void => {
  if (item.value.collapsible) {
    e.preventDefault()
    // toggle open status on click
    toggleIsOpen()
  }
}

// reset open status after navigation
const unregisterRouterHook = router.afterEach((to) => {
  nextTick(() => {
    isOpen.value = isOpenDefault.value
  })
})
onBeforeUnmount(() => {
  unregisterRouterHook()
})
</script>

<template>
  <li>
    <AutoLink v-if="item.link" :class="itemClass" :item="item">
        <template #before>
            <span v-show="item.icon">
                <NeoIcon :name="item.icon" :size="item.iconSize" />
            </span>
        </template>
    </AutoLink>
    <p
      v-else
      tabindex="0"
      :class="itemClass"
      @click="onClick"
      @keydown.enter="onClick"
    >
      <span>
        <NeoIcon :name="item.icon" :size="item.iconSize" />
        {{ item.text }}
      </span>
      <NeoIcon v-if="item.collapsible" name="neo-youjiantou" size="24" :rotate="isOpen ? '90deg' : 0" />
    </p>

    <DropdownTransition v-if="item.children?.length">
      <ul v-show="isOpen" class="sidebar-item-children">
        <NeoSidebarItem
          v-for="child in item.children"
          :key="`${depth}${child.text}${child.link}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </DropdownTransition>
  </li>
</template>
