export const sidebarUtilsMenu: SidebarMenuItem[] = utilList.map(
    ({ description, ...item }) => ({
        ...item,
        description,
        text: item.title, 
    })
)
