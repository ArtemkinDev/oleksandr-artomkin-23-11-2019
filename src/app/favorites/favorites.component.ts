import { CityCurrentConditionModel } from "./../../common/models/city-current-condition.model";
import { WeatherService } from "./../../common/services/weather.service";
import { AppStateService } from "./../../common/services/app-state.service";
import { Component, OnDestroy } from "@angular/core";
import { Subscription, of, forkJoin } from "rxjs";
import { catchError } from "rxjs/operators";

import { CityModel } from "../../common/models/city.model";

@Component({
    selector: "app-favorites",
    templateUrl: "./favorites.component.html",
    styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent implements OnDestroy {
    public favoriteCities: CityModel[] = [];

    public weatherServiceSubscription: Subscription;

    constructor(private state: AppStateService, private weatherService: WeatherService) {
        this.getFavoriteCities();
    }

    public getFavoriteCities() {
        const favoriteCity: CityModel[] = this.state.getUserSettings().favourites;

        if (favoriteCity.length === 0 || !favoriteCity) {
            return;
        }

        const observables = favoriteCity.map(city =>
            this.weatherService.getCurrentConditions(city).pipe(catchError(() => of(null)))
        );

        this.weatherServiceSubscription = forkJoin(observables).subscribe(
            (data: CityCurrentConditionModel[]): void => {
                const citiesArray = data.filter(c => {
                    return c;
                });
                this.favoriteCities = [...citiesArray];
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
