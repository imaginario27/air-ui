export const sidebarBlocksMenu: SidebarMenuItem[] = blockList.map(
    ({ imgUrl, description, sectionIcon, ...item }) => ({
        ...item,
        icon: sectionIcon,
        text: item.title, 
    })
)