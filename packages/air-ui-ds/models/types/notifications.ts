export interface NotificationItem {
    id: string;
    read: boolean;
    title: string;
    description: string;
    timeAgo: string;
    author: string;
    link: string;
    icon?: string;
    iconColor?: ColorAccent;
}