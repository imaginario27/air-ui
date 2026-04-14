export const sidebarGettingStartedMenu: SidebarMenuItem[] = [
    {
        isSectionTitle: true,
        text: 'Getting started',
        icon: 'mdi:play-box-outline',
    },
    {
        text: 'Introduction',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}`,
    },
    {
        text: 'Installation',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/installation`,
    },
    {
        isSectionTitle: true,
        text: 'Theme',
        icon: 'mdi:palette-outline',
    },
    {
        text: 'Customization',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.THEME}/theme-customization`,
    },
    {
        text: 'Design tokens',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.THEME}/design-tokens`,
    },
    {
        isSectionTitle: true,
        text: 'Agents',
        icon: 'mdi:robot-outline',
    },
    {
        text: 'MCP Server',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.AGENTS}/mcp-server`,
    },
    {
        text: 'LLMs.txt',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.AGENTS}/llms-txt`,
    }
]