import { UserService } from "./../../common/services/user.service";
import { DayForecastModel } from "./../../common/models/day-forecast.model";
import { WeatherHelper } from "./../../common/helpers/weather.helper";
import { AppStateService } from "./../../common/services/app-state.service";
import { WeatherService } from "./../../common/services/weather.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CityInterface } from "../../common/interfaces/city.interface";
import { Subscription, combineLatest, Observable } from "rxjs";
import { CityCurrentConditionModel } from "../../common/models/city-current-condition.model";
import { CityModel } from "./../../common/models/city.model";

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

    constructor(
        private weatherService: WeatherService,
        private state: AppStateService,
        private userService: UserService
    ) {}

    public ngOnInit() {
        this.currentCity = this.state.getCurrentCity();
        this.getInformationForCurrentDay();
        //this.fakeRequest();
        console.log(this.state.getUserSettings());
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

                this.currentBg = WeatherHelper.getCurrentWeatherBackground(this.currentConditions.weatherIcon);
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

    public addToFavorite(): void {
        this.favoriteCity = !this.favoriteCity;
        this.userService.updateUserSettingsFavourites(this.currentCity);
    }

    public selectedNewCity(city: CityModel): void {
        this.state.setCurrentCity(city);
        this.currentCity = this.state.getCurrentCity();

        //this.getInformationForCurrentDay();
        this.fakeRequest();
    }

    // fake data REMOVE ON LIVE
    public fakeRequest() {
        this.weatherServiceSubscription = combineLatest(
            this.weatherService.fakeCurrentConditions(),
            this.weatherService.fakeDefaultDailyForecasts()
        ).subscribe(
            (data: [CityCurrentConditionModel, DayForecastModel[]]): void => {
                this.currentConditions = data[0];
                this.currentConditionsIsLoaded = true;

                this.dailyForecasts = data[1];
                this.dailyForecastsIsLoaded = true;

                this.currentBg = WeatherHelper.getCurrentWeatherBackground(this.currentConditions.weatherIcon);
                this.favoriteCity = this.userService.checkIfCityInFavourites(this.currentCity);

                console.log(this.dailyForecasts);
            },
            error => console.log(error)
        );
    }

    public ngOnDestroy(): void {
        if (this.weatherServiceSubscription) {
            this.weatherServiceSubscription.unsubscribe();
        }
    }
}
