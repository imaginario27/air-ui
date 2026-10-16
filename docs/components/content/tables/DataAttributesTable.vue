<template>
    <div class="overflow-x-auto">
        <ProseTable v-if="attributes.length">
            <ProseThead>
                <ProseTr>
                    <ProseTh> Attribute </ProseTh>
                    <ProseTh> Value </ProseTh>
                    <ProseTh> Description </ProseTh>
                </ProseTr>
            </ProseThead>

            <ProseTbody>
                <ProseTr v-for="(attribute, index) in attributes" :key="index">
                    <ProseTd>
                        <ProseCode :color="ColorAccent.PRIMARY_BRAND" class="font-semibold whitespace-nowrap">
                            {{ attribute.name }}
                        </ProseCode>
                    </ProseTd>
                    <ProseTd>
                        <ProseCode class="whitespace-nowrap">
                            {{ attribute.value }}
                        </ProseCode>
                    </ProseTd>
                    <ProseTd>
                        <p v-if="typeof attribute.description === 'string'" class="text-text-default text-sm">
                            {{ attribute.description }}
                        </p>
                        <p
                            v-else-if="Array.isArray(attribute.description)"
                            class="text-text-default flex flex-wrap gap-x-1"
                        >
                            <template v-for="(part, i) in attribute.description" :key="i">
                                <span v-if="typeof part === 'string'">
                                    {{ part }}
                                </span>
                                <ProseCode v-else class="text-xs">
                                    {{ part.content }}
                                </ProseCode>
                            </template>
                        </p>
                    </ProseTd>
                </ProseTr>
            </ProseTbody>
        </ProseTable>
    </div>
</template>
<script setup lang="ts">
// Local interfaces
interface DataAttributesTableItem {
    name: string
    value: string
    description: string | Array<string | { type: 'code'; content: string }>
}

// Props
defineProps({
    attributes: {
        type: Array as PropType<DataAttributesTableItem[]>,
        default: () => [],
    },
})
</script>
