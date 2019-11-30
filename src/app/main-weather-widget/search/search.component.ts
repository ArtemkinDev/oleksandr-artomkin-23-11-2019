import { Component, EventEmitter, Output } from "@angular/core";
import { WeatherService } from "./../../../common/services/weather.service";
import { Observable, of } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from "rxjs/operators";
import { CityModel } from "./../../../common/models/city.model";
import { NgbTypeaheadSelectItemEvent } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
    public model: string;
    public searching: boolean = false;
    public searchFailed: boolean = false;
    @Output()
    public clickedCity: EventEmitter<CityModel> = new EventEmitter<CityModel>();

    public formatter = (city: CityModel) => city.cityName;

    constructor(private weatherService: WeatherService) {}

    public search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.weatherService.search(term).pipe(
                    tap(() => (this.searchFailed = false)),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    })
                )
            ),
            tap(() => (this.searching = false))
        );

    public selectedItem(item: NgbTypeaheadSelectItemEvent): void {
        this.clickedCity.emit(item.item);
    }

    public clearInput(): void {
        this.model = "";
    }
}
