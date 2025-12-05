<template>
    <div class="w-full hidden lg:block">
        <DropdownMenu 
            class="border border-border-default"
            positionClass="absolute bottom-[64px]"
        >
            <template #activator="{ onClick }">

                 <!-- User Wrapper -->
                <div 
                    :class="[
                        'w-full min-h-[64px]',
                        'py-3',
                        'px-6',
                        'hover:cursor-pointer',
                        'group',
                        'flex',
                        'items-center',
                        'bg-background-surface',
                    ]"
                    @click="() => onClick()"
                >
                    <User 
                        :displayName="userDisplayName" 
                        isInteractive
                        :imgUrl= "userAvatarUrl"
                    />
                </div>
            </template>
            <template #items="{ onClose }">
                <DropdownMenuItem 
                    v-for="item in menuItems" :key="item.text"
                    :text="item.text"
                    :actionType="item.actionType"
                    :to="item.to"
                    :type="item.type"
                    :icon="item.icon"
                    :imgUrl="item.imgUrl"
                    :alt="item.alt"
                    class="px-6 w-full"
                    @click="() => {
                        if(item.callback) {
                            item.callback()
                        }
                        onClose()
                    }"
                />
            </template>
        </DropdownMenu>
    </div>
</template>

<script setup lang="ts">
// Props 
defineProps({
    userDisplayName: {
        type: String as PropType<string>,
        default: 'Test user'
    },
    userAvatarUrl: String as PropType<string>,
    menuItems: {
        type: Array as PropType<DropdownMenuItem[]>,
        default: () => [
            {
                text: 'Account settings',
                icon: 'mdiAccountCogOutline',
            },
            {
                text: 'Support',
                icon: 'mdiLifebuoy',
                to: '/',
            },
            {
                text: 'Logout',
                icon: 'mdiLogout',
                actionType: DropdownActionType.ACTION,
                type: DropdownItemType.DANGER_ICON,
                callback: () => {},
            },
        ],
    },
})
</script>
