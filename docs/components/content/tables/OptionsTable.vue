<template>
    <div class="overflow-x-auto">
        <ProseTable v-if="options.length">
            <ProseThead>
                <ProseTr>
                    <ProseTh>
                        Value
                    </ProseTh>
                    <ProseTh>
                        Description
                    </ProseTh>
                </ProseTr>
            </ProseThead>

            <ProseTbody>
                <ProseTr v-for="(option, index) in options" :key="index">
                    <ProseTd>
                        <ProseCode 
                            :color="ColorAccent.PRIMARY_BRAND"
                            class="font-semibold"
                        >
                            {{ option.value }}
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
interface OptionsTableItem {
    value: string
    description: string | Array<string | { type: 'code', content: string }>
}

// Props
defineProps({
    options: {
        type: Array as PropType<OptionsTableItem[]>,
        default: () => []
    }
})
</script>