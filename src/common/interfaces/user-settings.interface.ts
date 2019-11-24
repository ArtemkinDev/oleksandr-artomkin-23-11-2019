import { CityModel } from "./../models/city.model";

export interface UserSettingsInterface {
    temperature: string;
    theme: string;
    favourites: CityModel[];
}
