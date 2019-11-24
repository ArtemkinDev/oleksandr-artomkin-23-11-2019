import { DayForecastInterface } from "../interfaces/day-forecast.interface";

export class DayForecastModel implements DayForecastInterface {
    public date: string;
    public temperature: string;
    public dayIcon: number;
    public nightIcon: number;

    constructor(day: DayForecastInterface = {} as DayForecastInterface) {
        this.date = day.date;
        this.temperature = day.temperature;
        this.dayIcon = day.dayIcon;
        this.nightIcon = day.nightIcon;
    }
}
