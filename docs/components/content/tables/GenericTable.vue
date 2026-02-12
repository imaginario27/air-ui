<template>
    <div class="overflow-x-auto">
        <ProseTable v-if="normalizedItems.length">
            <ProseThead v-if="headers.length">
                <ProseTr>
                    <ProseTh
                        v-for="header in headers"
                        :key="header"
                    >
                        {{ header }}
                    </ProseTh>
                </ProseTr>
            </ProseThead>

            <ProseTbody>
                <ProseTr
                    v-for="(row, rowIndex) in normalizedItems"
                    :key="rowIndex"
                >
                    <ProseTd
                        v-for="(cell, cellIndex) in row"
                        :key="cellIndex"
                        :class="[
                            'text-text-default',
                            'text-sm',
                            boldColumnIndexes.includes(cellIndex) && 'font-semibold',
                        ]"
                    >
                        {{ cell }}
                    </ProseTd>
                </ProseTr>
            </ProseTbody>
        </ProseTable>
    </div>
</template>

<script setup lang="ts">
type GenericTableRow = Record<string, string>

const props = defineProps({
    headers: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    items: {
        type: Array as PropType<GenericTableRow[]>,
        default: () => [],
    },
    boldColumns: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
})

/**
 * Precompute slug keys from headers
 */
const headerKeys = computed(() =>
    props.headers.map((header) =>
        convertStringIntoSlugFormat(header),
    ),
)

/**
 * Determine which column indexes should be bold
 */
const boldColumnIndexes = computed(() => {
    const boldKeys = props.boldColumns.map((col) =>
        convertStringIntoSlugFormat(col),
    )

    return headerKeys.value
        .map((key, index) =>
            boldKeys.includes(key) ? index : -1,
        )
        .filter((index) => index !== -1)
})

/**
 * Normalize rows into ordered arrays
 */
const normalizedItems = computed(() => {
    if (!props.headers.length || !props.items.length) {
        return []
    }

    return props.items.map((item) =>
        headerKeys.value.map((key) => item[key] ?? ''),
    )
})
</script>
