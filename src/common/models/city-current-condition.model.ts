import { CityModel } from "./city.model";
import { CityCurrentConditionInterface } from "./../interfaces/city-current-condition.interface";

export class CityCurrentConditionModel implements CityCurrentConditionInterface {
    public cityName: string;
    public locationKey: string;
    public weatherText: string;
    public weatherIcon: string;
    public temperature: number;

    constructor(
        currentCIty: CityModel,
        currentCondition: CityCurrentConditionInterface = {} as CityCurrentConditionInterface
    ) {
        this.cityName = currentCIty.cityName;
        this.locationKey = currentCIty.locationKey;
        this.weatherText = currentCondition["WeatherText"];
        this.weatherIcon = currentCondition["WeatherIcon"];
        this.temperature = currentCondition["Temperature"]["Metric"]["Value"];
    }
}
