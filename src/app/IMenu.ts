export interface IMenu {
    text: string,
    icon: string,
    Role: any,
    routerLink?: string;
    children: IMenuItem[]
}
export interface IMenuItem {
    text: string,
    icon: string,
    Role: any;
    routerLink: string;
}