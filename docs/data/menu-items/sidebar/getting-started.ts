export const sidebarGettingStartedMenu: SidebarMenuItem[] = [
    {
        isSectionTitle: true,
        text: 'Getting started',
        icon: 'mdiPlayBoxOutline',
    },
    {
        text: 'Introduction',
        to: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}`,
    },
    {
        text: 'Installation',
        to: `/${AppSlug.DOCS}/installation`,
    },
]