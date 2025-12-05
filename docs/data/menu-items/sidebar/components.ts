export const sidebarComponentsMenu: SidebarMenuItem[] = componentList.map(
    ({ imgUrl, description, sectionIcon, ...item }) => ({
        ...item,
        icon: sectionIcon,
        text: item.title, 
    })
)