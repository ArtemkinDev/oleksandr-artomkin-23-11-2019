import { UserService } from "./../../common/services/user.service";
import { DayForecastModel } from "./../../common/models/day-forecast.model";
import { CommonHelper } from "./../../common/helpers/common.helper";
import { AppStateService } from "./../../common/services/app-state.service";
import { WeatherService } from "./../../common/services/weather.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CityInterface } from "../../common/interfaces/city.interface";
import { Subscription, combineLatest, Observable } from "rxjs";
import { CityCurrentConditionModel } from "../../common/models/city-current-condition.model";

@Component({
    selector: "app-main-weather-widget",
    templateUrl: "./main-weather-widget.component.html",
    styleUrls: ["./main-weather-widget.component.scss"],
})
export class MainWeatherWidgetComponent implements OnInit, OnDestroy {
    public weatherServiceSubscription: Subscription;
    public currentCity: CityInterface;
    public currentConditions: CityCurrentConditionModel;
    public dailyForecasts: DayForecastModel[];
    public currentBg: string = "default";

    public currentConditionsIsLoaded: boolean = false;
    public dailyForecastsIsLoaded: boolean = false;

    public favoriteCity: boolean = false;

    public defaultCurrentConditions: CityCurrentConditionModel = {
        cityName: "Tel Aviv",
        locationKey: "215854",
        temperature: 23.5,
        weatherIcon: "35",
        weatherText: "Mostly sunny",
    };

    public defaultDailyForecasts: DayForecastModel[] = [
        {
            date: "Sun",
            dayIcon: 3,
            nightIcon: 35,
            temperature: "12.9",
        },
        {
            date: "Mon",
            dayIcon: 3,
            nightIcon: 33,
            temperature: "17.7",
        },
        {
            date: "Tue",
            dayIcon: 1,
            nightIcon: 33,
            temperature: "16.5",
        },
        {
            date: "Wed",
            dayIcon: 2,
            nightIcon: 35,
            temperature: "15.4",
        },
        {
            date: "Thu",
            dayIcon: 14,
            nightIcon: 34,
            temperature: "14.9",
        },
    ];

    constructor(
        private weatherService: WeatherService,
        private state: AppStateService,
        private userService: UserService
    ) {}

    public ngOnInit() {
        this.currentCity = this.state.getCurrentCity();
        this.getInformationForCurrentDay();
        // this.currentConditions = this.defaultCurrentConditions;
        // this.dailyForecasts = this.defaultDailyForecasts;
        // this.currentConditionsIsLoaded = true;
        // this.dailyForecastsIsLoaded = true;
    }

    public getInformationForCurrentDay() {
        this.weatherServiceSubscription = combineLatest(
            this.getCityCurrentConditions(),
            this.getDailyForecasts()
        ).subscribe(
            (data: [CityCurrentConditionModel, DayForecastModel[]]): void => {
                this.currentConditions = data[0];
                this.currentConditionsIsLoaded = true;

                this.dailyForecasts = data[1];
                this.dailyForecastsIsLoaded = true;

                this.currentBg = CommonHelper.getCurrentWeatherBackground(this.currentConditions.weatherIcon);
                this.favoriteCity = this.userService.checkIfCityInFavourites(this.currentCity);

                console.log(this.dailyForecasts);
            },
            error => console.log(error)
        );
    }

    public getCityCurrentConditions(): Observable<CityCurrentConditionModel> {
        return this.weatherService.getCurrentConditions(this.currentCity);
    }

    public getDailyForecasts(): Observable<DayForecastModel[]> {
        return this.weatherService.getDailyForecasts(this.currentCity.locationKey);
    }

    public ngOnDestroy(): void {
        if (this.weatherServiceSubscription) {
            this.weatherServiceSubscription.unsubscribe();
        }
    }

    public addToFavorite(locationKey: string): void {
        this.favoriteCity = true;
        this.userService.updateUserSettingsFavourites(this.currentCity);
        console.log(locationKey);
    }
}
