import { KeyValueInterface } from "../interfaces/key-value.interface";
import { DayForecastModel } from "../models/day-forecast.model";
export class CommonHelper {
    public static getCurrentWeatherBackground(iconNumber: string): string {
        const icon: number = parseInt(iconNumber, 10);
        let statement: string = "default";

        switch (true) {
            case icon >= 1 && icon <= 5:
                statement = "clear";
                break;
            case (icon > 5 && icon <= 11) || (icon >= 19 && icon <= 29):
                statement = "clouds";
                break;
            case icon >= 12 && icon <= 18:
                statement = "rain";
                break;
            case (icon >= 33 && icon <= 38) || (icon >= 43 && icon <= 44):
                statement = "smoke";
                break;
            default:
                break;
        }

        return statement;
    }

    public static createDayForecastModel(day: KeyValueInterface<any> = {}): DayForecastModel {
        return new DayForecastModel({
            date: CommonHelper.getDayFromEpochDate(day["EpochDate"]),
            temperature: day["Temperature"]["Minimum"]["Value"],
            dayIcon: day["Day"]["Icon"],
            nightIcon: day["Night"]["Icon"],
        });
    }

    public static getDayFromEpochDate(date: number): string {
        const weekdays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfTheWeek = new Date(date * 1000).getDay();

        return weekdays[dayOfTheWeek];
    }
}
