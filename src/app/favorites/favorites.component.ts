import { WeatherService } from "./../../common/services/weather.service";
import { AppStateService } from "./../../common/services/app-state.service";
import { Component, Input, OnDestroy } from "@angular/core";
import { Subscription, combineLatest } from "rxjs";

import { CityModel } from "../../common/models/city.model";

@Component({
    selector: "app-favorites",
    templateUrl: "./favorites.component.html",
    styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent implements OnDestroy {
    @Input()
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

        this.weatherServiceSubscription = combineLatest(
            favoriteCity.map(c => {
                this.weatherService.getCurrentConditions(c);
            })
        ).subscribe(
            data => {
                data.forEach(item => {
                    //let i = index;

                    console.log(item);

                    // this.favoriteCities.push(data[i]);
                });
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
