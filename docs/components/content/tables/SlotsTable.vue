<template>
    <div class="overflow-x-auto">
        <ProseTable v-if="slots.length">
            <ProseThead>
                <ProseTr>
                    <ProseTh>
                        Name
                    </ProseTh>
                    <ProseTh>
                        Description
                    </ProseTh>
                </ProseTr>
            </ProseThead>

            <ProseTbody>
                <ProseTr v-for="(option, index) in slots" :key="index">
                    <ProseTd>
                        <ProseCode 
                            :color="ColorAccent.PRIMARY_BRAND"
                            class="font-semibold"
                        >
                            {{ option.name }}
                        </ProseCode>
                    </ProseTd>
                    <ProseTd>
                        <p 
                            v-if="typeof option.description === 'string'"
                            class="text-text-default"
                        >
                            {{ option.description }}
                        </p>
                        <p 
                            v-else-if="Array.isArray(option.description)"
                            class="text-text-default flex flex-wrap gap-x-1"
                        >
                            <template v-for="(part, i) in option.description" :key="i">
                                <span v-if="typeof part === 'string'">
                                    {{ part }}
                                </span>
                                <ProseCode
                                    v-else
                                    class="text-xs"
                                >
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
interface SlotsTableItem {
    name: string
    description: string | Array<string | { type: 'code', content: string }>
}

// Props
defineProps({
    slots: {
        type: Array as PropType<SlotsTableItem[]>,
        default: () => []
    }
})
</script>