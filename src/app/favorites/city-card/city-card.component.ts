import { AppStateService } from "./../../../common/services/app-state.service";
import { CityModel } from "./../../../common/models/city.model";
import { CommonHelper } from "./../../../common/helpers/common.helper";
import { CityCurrentConditionModel } from "./../../../common/models/city-current-condition.model";
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-city-card",
    templateUrl: "./city-card.component.html",
    styleUrls: ["./city-card.component.scss"],
})
export class CityCardComponent implements OnInit {
    @Input()
    public city: CityCurrentConditionModel;
    public currentBg: string = "default";

    constructor(private state: AppStateService, private router: Router) {}

    public ngOnInit() {
        this.currentBg = CommonHelper.getCurrentWeatherBackground(this.city.weatherIcon);
    }

    public showMoreDetailsAboutCity(city: CityCurrentConditionModel) {
        const currentCity: CityModel = new CityModel({
            locationKey: city.locationKey,
            cityName: city.cityName,
        });

        this.state.setCurrentCity(currentCity);
        this.router.navigateByUrl("/");
    }
}
