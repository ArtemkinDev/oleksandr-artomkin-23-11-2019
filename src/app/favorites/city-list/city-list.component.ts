import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-city-list",
    templateUrl: "./city-list.component.html",
    styleUrls: ["./city-list.component.scss"],
})
export class CityListComponent implements OnInit {
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
    constructor() {}

    ngOnInit() {}
}
