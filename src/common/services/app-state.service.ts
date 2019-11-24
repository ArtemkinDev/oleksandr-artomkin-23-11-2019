import { UserSettingsModel } from "./../models/user-settings.model";
import { CityModel } from "../models/city.model";
import { Injectable } from "@angular/core";
// import { AppStateModel } from "../models/app-state.model";
// import { BehaviorSubject, Observable } from "rxjs";
import { KeyValueInterface } from "../interfaces/key-value.interface";

@Injectable({ providedIn: "root" })
export class AppStateService {
    private currentCity: CityModel;
    private userSettings: UserSettingsModel;

    public getCurrentCity(): CityModel {
        if (!this.currentCity) {
            this.setDefaultCurrentCity();
        }

        return this.currentCity;
    }

    public setCurrentCity(city: KeyValueInterface<any> = {}): void {
        this.currentCity = new CityModel({
            locationKey: city["Key"],
            cityName: city["AdministrativeArea"]["LocalizedName"],
        });
    }

    public setDefaultCurrentCity(): void {
        this.currentCity = new CityModel({
            locationKey: "215854",
            cityName: "Tel Aviv",
        });
    }

    public setUserSettings(settings: KeyValueInterface<any> = {}): void {
        const favourites =
            !!settings.favourites && settings.favourites instanceof Array
                ? settings.favourites.map(
                      city =>
                          new CityModel({
                              locationKey: city.locationKey,
                              cityName: city.locationKey,
                          })
                  )
                : [];

        this.userSettings = new UserSettingsModel({
            temperature: settings.temperature,
            theme: settings.theme,
            favourites: favourites,
        });
    }
}
