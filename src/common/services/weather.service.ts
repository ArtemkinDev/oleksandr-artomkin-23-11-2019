import { CommonHelper } from "./../helpers/common.helper";
import { DayForecastModel } from "./../models/day-forecast.model";
import { CityCurrentConditionModel } from "./../models/city-current-condition.model";
import { KeyValueInterface } from "./../interfaces/key-value.interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { CityInterface } from "../interfaces/city.interface";

@Injectable({ providedIn: "root" })
export class WeatherService {
    private API_key: string = "aDGg5IKEfD4AHF3Ow1Q2c9xBgwxVxWz8";
    private URL: string = "http://dataservice.accuweather.com/";
    private language: string = "en-us";
    private headers: any = {
        withCredentials: false,
    };

    constructor(private http: HttpClient) {}

    /**
     * Get Current Conditions Info from accuweather.com
     * @return { Observable<CityCurrentConditionModel> }
     */

    public getCurrentConditions(city: CityInterface): Observable<CityCurrentConditionModel> {
        return Observable.create((observer: Observer<CityCurrentConditionModel>) => {
            this.http
                .get<KeyValueInterface<any>[]>(
                    `${this.URL}currentconditions/v1/${city.locationKey}?apikey=${this.API_key}&language=${this.language}&details=true`,
                    this.headers
                )
                .subscribe(
                    (data: KeyValueInterface<any>): void => {
                        const dataModel: any = new CityCurrentConditionModel(city, data[0]);

                        observer.next(dataModel);
                        observer.complete();
                    },
                    (error: HttpErrorResponse): void => observer.error(error),
                    (): void => observer.complete()
                );
        });
    }

    /**
     * Get Daily Forecasts Info from accuweather.com
     * @return { Observable<CityCurrentConditionModel> }
     */

    public getDailyForecasts(locationKey: string): Observable<DayForecastModel[]> {
        return Observable.create((observer: Observer<DayForecastModel[]>) => {
            this.http
                .get<KeyValueInterface<any>[]>(
                    `${this.URL}forecasts/v1/daily/5day/${locationKey}?apikey=${this.API_key}&language=${this.language}&metric=true`,
                    this.headers
                )
                .subscribe(
                    (data: KeyValueInterface<any>): void => {
                        const dataModel: DayForecastModel[] = data["DailyForecasts"].map(
                            (d: KeyValueInterface<any>): DayForecastModel => CommonHelper.createDayForecastModel(d)
                        );

                        observer.next(dataModel);
                        observer.complete();
                    },
                    (error: HttpErrorResponse): void => observer.error(error),
                    (): void => observer.complete()
                );
        });
    }
}
