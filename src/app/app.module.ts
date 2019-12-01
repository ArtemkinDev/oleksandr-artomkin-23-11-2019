import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { BaseComponent } from "./base/base.component";
import { RouterModule } from "@angular/router";
import { ROUTES } from "../common/const/routes.const";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { MainWeatherWidgetComponent } from "./main-weather-widget/main-weather-widget.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { CityCardComponent } from "./favorites/city-card/city-card.component";
import { CityListComponent } from "./favorites/city-list/city-list.component";
import { SearchComponent } from "./main-weather-widget/search/search.component";
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    declarations: [
        AppComponent,
        BaseComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        NotFoundPageComponent,
        MainWeatherWidgetComponent,
        FavoritesComponent,
        CityCardComponent,
        CityListComponent,
        SearchComponent,
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES),
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
