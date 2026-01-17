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
        <Icon 
            name="mdi:console-line" 
            iconClass="text-icon-neutral-subtle" 
        />

        <span class="font-medium select-none">
            {{ code }}
        </span>

        <button 
            type="button"
            class="flex items-center justify-center w-[20px] h-[20px]"
        >
            <Icon 
                :name="currentCopyButtonIcon" 
                :iconClass="[  
                    currentCopyButtonIcon === 'mdi:check' ? 'text-icon-success' : 'text-icon-neutral-subtle'
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
const currentCopyButtonIcon = ref<any>("mdi:content-copy")

// Methods
const handleCopyScript = async () => {
    const success = await copyToClipboard(props.code)

    if(success) {
        currentCopyButtonIcon.value = "mdi:check"

        setTimeout(() => {
            currentCopyButtonIcon.value = "mdi:content-copy"
        }, 1500)
    }
}
</script>