import { CityInterface } from "../interfaces/city.interface";

export class CityModel implements CityInterface {
    public locationKey: string;
    public cityName: string;

    constructor(city: CityInterface = {} as CityInterface) {
        this.locationKey = city.locationKey;
        this.cityName = city.cityName;
    }
}
