export const sidebarGettingStartedMenu: SidebarMenuItem[] = [
    {
        isSectionTitle: true,
        text: 'Getting started',
        icon: 'mdi:play-box-outline',
    },
    {
        text: 'Introduction',
        to: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}`,
    },
    {
        text: 'Installation',
        to: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}/installation`,
    },
    {
        isSectionTitle: true,
        text: 'Theme',
        icon: 'mdi:palette-outline',
    },
    {
        text: 'Customization',
        to: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}/${AppSlug.THEME}/theme-customization`,
    },
    {
        text: 'Design tokens',
        to: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}/${AppSlug.THEME}/design-tokens`,
    },
]