import { CityCurrentConditionModel } from "./../../../common/models/city-current-condition.model";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-city-list",
    templateUrl: "./city-list.component.html",
    styleUrls: ["./city-list.component.scss"],
})
export class CityListComponent {
    public cities: Object[] = [
        {
            id: 1,
            name: "Tel Aviv",
            temp: 38,
            desc: "Sunny",
        },
        {
            id: 1,
            name: "Tel Aviv",
            temp: 38,
            desc: "Sunny",
        },
        {
            id: 1,
            name: "Tel Aviv",
            temp: 38,
            desc: "Sunny",
        },
        {
            id: 1,
            name: "Tel Aviv",
            temp: 38,
            desc: "Sunny",
        },
        {
            id: 1,
            name: "Tel Aviv",
            temp: 38,
            desc: "Sunny",
        },
    ];

    @Input()
    public favoriteCities: CityCurrentConditionModel[];

    constructor() {}
}
