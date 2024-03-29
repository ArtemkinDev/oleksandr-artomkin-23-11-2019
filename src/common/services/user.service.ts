import { CityModel } from "./../models/city.model";
import { LocalstorageService } from "./localstorage.service";
// import { UserHelper } from "./../helpers/user.helper";
// import { UserModel } from "./../models/user/user.model";
import { KeyValueInterface } from "./../interfaces/key-value.interface";

import { Injectable } from "@angular/core";
import { AppStateService } from "./app-state.service";

@Injectable({ providedIn: "root" })
export class UserService {
    private defaultUserSettings: KeyValueInterface<any> = {
        temperature: "c",
        theme: "light",
        favourites: [],
    };

    constructor(private localstorage: LocalstorageService, private appState: AppStateService) {}

    // private updateLocalStorage(users: UserModel[]): void {
    //     const usersParse = users.map<KeyValueInterface<any>>((u: UserModel) => UserHelper.CreateObjectFromClass(u));
    //     this.localstorage.delete("userList");
    //     this.localstorage.set("userList", usersParse);
    // }

    public createUserSettings() {
        this.localstorage.set("userSettings", this.defaultUserSettings);
        this.appState.setUserSettings(this.defaultUserSettings);
    }

    public checkIfUserSettingsExist(): boolean {
        return !!this.localstorage.get("userSettings");
    }

    public updateUserSettingsTheme(value: string): void {
        const prevSettings: KeyValueInterface<any> = this.localstorage.get("userSettings");
        const newSettings: KeyValueInterface<any> = {};
        if (prevSettings.theme === value) {
            return;
        }
        newSettings.temperature = prevSettings.temperature;
        newSettings.favourites = prevSettings.favourites;
        newSettings.theme = value;

        this.localstorage.set("userSettings", newSettings);
        this.appState.setUserSettings(newSettings);
    }

    public updateUserSettingsFavourites(value): void {
        const prevSettings: KeyValueInterface<any> = this.localstorage.get("userSettings");
        const newSettings: KeyValueInterface<any> = {};
        const checkIfCityInFavoriteIndex = prevSettings.favourites.findIndex(c => c.locationKey === value.locationKey);

        if (checkIfCityInFavoriteIndex > -1) {
            prevSettings.favourites.splice(checkIfCityInFavoriteIndex, 1);
        } else {
            prevSettings.favourites.push(value);
        }

        newSettings.temperature = prevSettings.temperature;
        newSettings.favourites = prevSettings.favourites;
        newSettings.theme = prevSettings.theme;

        this.localstorage.set("userSettings", newSettings);
        this.appState.setUserSettings(newSettings);
    }

    public checkIfCityInFavourites(city: CityModel): boolean {
        const prevSettings: KeyValueInterface<any> = this.localstorage.get("userSettings");
        const checkIfCityInFavorite = prevSettings.favourites.find(c => c.locationKey === city.locationKey);

        return !!checkIfCityInFavorite;
    }
}
