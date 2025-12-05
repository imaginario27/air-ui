<template>
    <div
        :class="[
            orientation === Orientation.HORIZONTAL ? 'flex flex-col gap-2' : 'flex gap-6 flex-wrap',
        ]"
    >
        <div>
            <p
                v-if="title"
                class="text-sm font-semibold text-theme-neutral-50 mb-4"
            >
                {{ title }}
            </p>

            <!-- Solo SVGs -->
            <div
                v-if="onlySvgs"
                class="flex gap-3 flex-wrap"
            >
                <NuxtLink
                    v-for="(item, index) in items"
                    :key="index"
                    :to="item.path"
                    class="inline-block"
                    target="_blank"
                >
                    <SVGImage
                        v-if="item.svg"
                        :src="item.svg"
                        alt="icon"
                        class="max-w-[20px] filter invert"
                    />
                </NuxtLink>
            </div>

            <!-- Texto / Iconos -->
            <div
                v-else
                :class="[
                    orientation === Orientation.VERTICAL
                        ? 'flex flex-col gap-4'
                        : 'flex gap-6 flex-wrap',
                ]"
            >
                <NuxtLink
                    v-for="(item, index) in items"
                    :key="index"
                    :to="item.path"
                    class="flex items-center gap-2 text-sm text-theme-neutral-50 hover:underline"
                >
                    <MdiIcon
                        v-if="item.icon"
                        :icon="item.icon"
                        size="20"
                        preserveAspectRatio="xMidYMid meet"
                    />
                    <span v-if="item.text">{{ item.text }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'

type NavItem = {
    path: string
    text?: string
    icon?: string
    svg?: string
}

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    items: {
        type: Array as PropType<NavItem[]>,
        required: true,
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
    },
})

const onlySvgs = computed(() => props.items.every(item => item.svg && !item.text && !item.icon))
</script>
