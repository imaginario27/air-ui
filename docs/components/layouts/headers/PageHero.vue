<template>
    <div
        :class="[
            'relative',
            'isolate',
            'overflow-hidden',
            'rounded-b-[2.5rem]',
            'bg-[color-mix(in_srgb,var(--color-background-primary-brand-default)_22%,var(--color-theme-neutral-950))]',
            'px-4',
            'pb-16',
            'pt-14',
            'sm:pb-20',
            'sm:pt-16',
        ]"
    >
        <!-- Background image with a dark scrim for text legibility -->
        <template v-if="backgroundImage">
            <img
                :src="backgroundImage"
                alt=""
                aria-hidden="true"
                :class="['pointer-events-none', 'absolute', 'inset-0', '-z-10', 'size-full', 'object-cover']"
            />
            <div
                aria-hidden="true"
                :class="['pointer-events-none', 'absolute', 'inset-0', '-z-10', 'bg-theme-neutral-950/40']"
            />
        </template>

        <FilmGrain v-if="hasFilmGrain" />

        <div class="relative mx-auto max-w-300">
            <div class="flex flex-col items-start gap-6">
                <span
                    v-if="badge"
                    :class="[
                        'inline-flex',
                        'items-center',
                        'gap-2',
                        'rounded-full',
                        'border',
                        'border-text-neutral-on-filled/20',
                        'bg-text-neutral-on-filled/10',
                        'px-3',
                        'py-1',
                        'text-sm',
                        'font-medium',
                        'text-text-neutral-on-filled',
                        'backdrop-blur-md',
                    ]"
                >
                    <Icon v-if="badgeIcon" :name="badgeIcon" />
                    {{ badge }}
                </span>

                <h1 :class="['text-4xl', 'font-bold', 'tracking-tight', 'text-text-neutral-on-filled', 'sm:text-5xl']">
                    {{ title }}
                </h1>

                <p v-if="description" class="max-w-136 text-balance text-lg text-text-neutral-on-filled/75">
                    {{ description }}
                </p>

                <slot />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: undefined,
    },
    badge: {
        type: String,
        default: undefined,
    },
    badgeIcon: {
        type: String,
        default: undefined,
    },
    backgroundImage: {
        type: String,
        default: undefined,
    },
    hasFilmGrain: {
        type: Boolean,
        default: true,
    },
})
</script>
