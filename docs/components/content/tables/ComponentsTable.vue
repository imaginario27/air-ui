<template>
    <div class="overflow-x-auto">
        <ProseTable v-if="components.length">
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
                <ProseTr v-for="(option, index) in components" :key="index">
                    <ProseTd>
                        <ProseCode 
                            :color="ColorAccent.PRIMARY_BRAND"
                            class="font-semibold whitespace-nowrap"
                        >
                            {{ option.name }}
                        </ProseCode>
                    </ProseTd>
                    <ProseTd>
                        <p 
                            class="text-text-default text-sm"
                        >
                            {{ option.description }}
                        </p>
                    </ProseTd>
                </ProseTr>
            </ProseTbody>
        </ProseTable>
    </div>
</template>
<script setup lang="ts">
// Local interfaces
interface ComponentTableItem {
    name: string
    description: string
}

// Props
defineProps({
    components: {
        type: Array as PropType<ComponentTableItem[]>,
        default: () => []
    }
})
</script>