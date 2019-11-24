import { Component } from "@angular/core";
import { MenuItemModel } from "./../../common/models/menu-item.model";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    public showMenu: boolean = false;

    public menuItems: MenuItemModel[] = [
        new MenuItemModel({
            path: "",
            exact: true
        }),
        new MenuItemModel({
            path: "favorites",
            exact: true
        }),
        new MenuItemModel({
            path: "settings",
            exact: false
        })
    ];

    public toggleMenu() {
        this.showMenu = !this.showMenu;
    }
}
