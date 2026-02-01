<template>
    <div class="overflow-x-auto">
        <ProseTable v-if="props.length">
            <ProseThead>
                <ProseTr>
                    <ProseTh>
                        Parameter
                    </ProseTh>
                    <ProseTh v-if="showRequiredColumn">
                        Required
                    </ProseTh>
                    <ProseTh v-if="showDefaultColumn">
                        Default
                    </ProseTh>
                    <ProseTh>
                        Type
                    </ProseTh>
                </ProseTr>
            </ProseThead>

            <ProseTbody>
                <ProseTr v-for="(prop, index) in props" :key="index">
                    <ProseTd>
                        <ProseCode 
                            :color="ColorAccent.PRIMARY_BRAND"
                            class="font-semibold"
                        >
                            {{ prop.name }}
                        </ProseCode>
                    </ProseTd>
                    <ProseTd v-if="showRequiredColumn">
                        <ProseCode v-if="prop.required">
                            {{ prop.required }}
                        </ProseCode>
                        <span v-else class="text-sm font-mono">
                            —
                        </span>
                    </ProseTd>
                    <ProseTd v-if="showDefaultColumn">
                        <ProseCode v-if="prop.default">
                            {{ prop.default }}
                        </ProseCode>
                        <span v-else class="text-sm font-mono">
                            —
                        </span>
                    </ProseTd>
                    <ProseTd>
                        <ProseCode class="w-fit">
                            {{ prop.type }}
                        </ProseCode>

                        <p 
                            v-if="prop.description" 
                            class="mt-2 text-text-default text-sm"
                            v-html="prop.description"
                        />
                    </ProseTd>
                </ProseTr>
            </ProseTbody>
        </ProseTable>
    </div>
</template>
<script setup lang="ts">
// Local interfaces
interface PropsTableItem {
    name: string
    required?: boolean
    default?: string
    type: string,
    description?: string
}

// Props
const definedProps = defineProps({
    props: {
        type: Array as PropType<PropsTableItem[]>,
        default: () => []
    }
})

const showRequiredColumn = computed(() => definedProps.props.some(p => 'required' in p))
const showDefaultColumn = computed(() => definedProps.props.some(p => 'default' in p))
</script>