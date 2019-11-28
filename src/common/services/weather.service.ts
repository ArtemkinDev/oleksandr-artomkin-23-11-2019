import { CommonHelper } from "./../helpers/common.helper";
import { DayForecastModel } from "./../models/day-forecast.model";
import { CityCurrentConditionModel } from "./../models/city-current-condition.model";
import { KeyValueInterface } from "./../interfaces/key-value.interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Observer, of } from "rxjs";
import { map } from "rxjs/operators";
import { CityInterface } from "../interfaces/city.interface";
import { CityModel } from "./../models/city.model";

const fakeResponse = [
    {
        Version: 1,
        Key: "28143",
        Type: "City",
        Rank: 10,
        LocalizedName: "Dhaka",
        Country: { ID: "BD", LocalizedName: "Bangladesh" },
        AdministrativeArea: { ID: "C", LocalizedName: "Dhaka" },
    },
    {
        Version: 1,
        Key: "202396",
        Type: "City",
        Rank: 10,
        LocalizedName: "Delhi",
        Country: { ID: "IN", LocalizedName: "India" },
        AdministrativeArea: { ID: "DL", LocalizedName: "Delhi" },
    },
    {
        Version: 1,
        Key: "58185",
        Type: "City",
        Rank: 13,
        LocalizedName: "Dongguan",
        Country: { ID: "CN", LocalizedName: "China" },
        AdministrativeArea: { ID: "GD", LocalizedName: "Guangdong" },
    },
    {
        Version: 1,
        Key: "102133",
        Type: "City",
        Rank: 13,
        LocalizedName: "Dalian",
        Country: { ID: "CN", LocalizedName: "China" },
        AdministrativeArea: { ID: "LN", LocalizedName: "Liaoning" },
    },
    {
        Version: 1,
        Key: "60971",
        Type: "City",
        Rank: 13,
        LocalizedName: "Deyang",
        Country: { ID: "CN", LocalizedName: "China" },
        AdministrativeArea: { ID: "SC", LocalizedName: "Sichuan" },
    },
    {
        Version: 1,
        Key: "60631",
        Type: "City",
        Rank: 13,
        LocalizedName: "Dezhou",
        Country: { ID: "CN", LocalizedName: "China" },
        AdministrativeArea: { ID: "SD", LocalizedName: "Shandong" },
    },
    {
        Version: 1,
        Key: "61417",
        Type: "City",
        Rank: 13,
        LocalizedName: "Dali Prefecture",
        Country: { ID: "CN", LocalizedName: "China" },
        AdministrativeArea: { ID: "YN", LocalizedName: "Yunnan" },
    },
    {
        Version: 1,
        Key: "2333431",
        Type: "City",
        Rank: 15,
        LocalizedName: "Dazhou",
        Country: { ID: "CN", LocalizedName: "China" },
        AdministrativeArea: { ID: "SC", LocalizedName: "Sichuan" },
    },
    {
        Version: 1,
        Key: "106771",
        Type: "City",
        Rank: 15,
        LocalizedName: "Datong",
        Country: { ID: "CN", LocalizedName: "China" },
        AdministrativeArea: { ID: "SX", LocalizedName: "Shanxi" },
    },
    {
        Version: 1,
        Key: "297442",
        Type: "City",
        Rank: 20,
        LocalizedName: "Dakar",
        Country: { ID: "SN", LocalizedName: "Senegal" },
        AdministrativeArea: { ID: "DK", LocalizedName: "Dakar" },
    },
];

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

    public search(term: string): Observable<CityModel[]> {
        if (term === "") {
            return of([]);
        }

        return this.http
            .get<KeyValueInterface<any>[]>(
                `${this.URL}locations/v1/cities/autocomplete?apikey=${this.API_key}&q=${term}&language=${this.language}`
            )
            .pipe(
                map(response =>
                    response.map(
                        city =>
                            new CityModel({
                                locationKey: city.Key,
                                cityName: city.LocalizedName,
                            })
                    )
                )
            );
    }

    public fakeSearch(term: string): Observable<CityModel[]> {
        if (term === "") {
            return of([]);
        } else {
            return of(
                fakeResponse.map(
                    city =>
                        new CityModel({
                            locationKey: city.Key,
                            cityName: city.LocalizedName,
                        })
                )
            );
        }
    }
}
