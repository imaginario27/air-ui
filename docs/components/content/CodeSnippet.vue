<template>
    <div 
        :class="[
            'flex',
            'items-center',
            'gap-2',
            'border border-border-default',
            'hover:border-border-neutral-hover',
            'hover:cursor-copy',
            'w-fit',
            'py-1 px-3',
            'rounded-md'
        ]"
        @click="handleCopyScript"
    >
        <MdiIcon 
            icon="mdiConsoleLine" 
            preserveAspectRatio="xMidYMid meet"
            class="w-[20px] h-[20px] text-icon-neutral-subtle" 
        />

        <span class="font-medium select-none">
            {{ code }}
        </span>

        <button 
            type="button"
            class="flex items-center justify-center w-[20px] h-[20px]"
        >
            <MdiIcon 
                :icon="currentCopyButtonIcon" 
                preserveAspectRatio="xMidYMid meet"
                :class="[  
                    'w-[20px] h-[20px]',
                    currentCopyButtonIcon === 'mdiCheck' ? 'text-icon-success' : 'text-icon-neutral-subtle'
                ]"         
                />
        </button>
        
    </div>
</template>
<script setup lang="ts">

// Props
const props = defineProps({
    code: {
        type: String as PropType<string>,
        required: true,
    }
})

// States
const currentCopyButtonIcon = ref<any>("mdiContentCopy")

// Methods
const handleCopyScript = async () => {
    const success = await copyToClipboard(props.code)

    if(success) {
        currentCopyButtonIcon.value = "mdiCheck"

        setTimeout(() => {
            currentCopyButtonIcon.value = "mdiContentCopy"
        }, 1500)
    }
}
</script>