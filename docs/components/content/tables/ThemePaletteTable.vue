<template>
    <div class="overflow-x-auto">
        <ProseTable v-if="items.length">
            <ProseThead>
                <ProseTr>
                    <ProseTh>
                        Theme palette
                    </ProseTh>
                    <ProseTh>
                        Description
                    </ProseTh>
                    <ProseTh>
                        Usage
                    </ProseTh>
                </ProseTr>
            </ProseThead>

            <ProseTbody>
                <ProseTr v-for="(item, index) in items" :key="index">
                    <ProseTd>
                        <ProseCode 
                            :color="item.color"
                            class="font-semibold"
                        >
                            {{ item.name }}
                        </ProseCode>
                    </ProseTd>
                    <ProseTd>
                        {{ item.description }}
                    </ProseTd>
                    <ProseTd>
                        {{ item.usage }}
                    </ProseTd>
                </ProseTr>
            </ProseTbody>
        </ProseTable>
    </div>
</template>
<script setup lang="ts">
// Local interfaces
interface ThemePaletteTableItem {
    name: string
    description: string
    usage: string
    color: ColorAccent
}

// Props
defineProps({
    items: {
        type: Array as PropType<ThemePaletteTableItem[]>,
        default: () => []
    }
})
</script>