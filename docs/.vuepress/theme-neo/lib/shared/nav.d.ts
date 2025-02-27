/**
 * Base nav item, displayed as text
 */
export interface NavItem {
    /* -------------------------------- neoTheme -------------------------------- */
    icon?: string;
    iconSize?: string;
    /* -------------------------------- neoTheme -------------------------------- */
    text: string;
    ariaLabel?: string;
}
/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends NavItem {
    children: T[];
}
/**
 * Props for `<AutoLink>`
 */
export interface NavLink extends NavItem {
    link: string;
    rel?: string;
    target?: string;
    activeMatch?: string;
}
/**
 * Navbar types
 */
export type NavbarItem = NavLink;
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[];
export type ResolvedNavbarItem = NavbarItem | NavGroup<ResolvedNavbarItem>;
/**
 * Sidebar types
 */
export type SidebarItem = NavItem & Partial<NavLink>;
export type SidebarGroup = SidebarItem & NavGroup<SidebarItem | SidebarGroup | string> & {
    collapsible?: boolean;
};
export type SidebarConfigArray = (SidebarItem | SidebarGroup | string)[];
export type SidebarConfigObject = Record<string, SidebarConfigArray>;
export type SidebarConfig = SidebarConfigArray | SidebarConfigObject;
export type ResolvedSidebarItem = SidebarItem & Partial<NavGroup<ResolvedSidebarItem>> & {
    collapsible?: boolean;
};
