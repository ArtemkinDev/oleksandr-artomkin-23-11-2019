import { CityModel } from "./city.model";
import { UserSettingsInterface } from "./../interfaces/user-settings.interface";

export class UserSettingsModel implements UserSettingsInterface {
    public temperature: string;
    public theme: string;
    public favourites: CityModel[];

    constructor(settings: UserSettingsInterface = {} as UserSettingsInterface) {
        this.temperature = settings.temperature;
        this.theme = settings.theme;
        this.favourites = settings.favourites;
    }
}
