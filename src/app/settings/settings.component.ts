import { UserService } from "./../../common/services/user.service";
import { AppStateService } from "./../../common/services/app-state.service";
import { Component } from "@angular/core";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
    public themes: string[] = ["light", "dark"];
    public currentTheme: string;
    public temperatures: string[] = ["Celsius", "Fahrenheit"];
    public currentTemperature: string;

    constructor(private state: AppStateService, private userService: UserService) {
        this.currentTheme = this.state.getUserSettings().theme;
        this.currentTemperature = this.state.getUserSettings().temperature;

        console.log(this.currentTheme, this.currentTemperature);
    }

    public changeTheme(theme: string): void {
        if (theme === this.currentTheme) {
            return;
        }

        this.currentTheme = theme;
        this.userService.updateUserSettingsTheme(theme);
    }

    public changeTemperature(temp: string): void {
        if (temp === this.currentTemperature) {
            return;
        }

        this.currentTemperature = temp;
        this.userService.updateUserSettingsTemperature(temp);
    }
}
