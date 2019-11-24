import { MenuInterface } from "./../interfaces/menu-item.interface";

export class MenuItemModel implements MenuInterface {
    public path: string;
    public exact: boolean;

    constructor(item: MenuInterface = {} as MenuInterface) {
        this.path = item.path;
        this.exact = item.exact;
    }
}
