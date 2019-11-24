import { BaseResolver } from "./../resolvers/base.resolver";
import { FavoritesComponent } from "./../../app/favorites/favorites.component";
import { BaseComponent } from "../../app/base/base.component";
import { HomeComponent } from "../../app/home/home.component";
import { Routes } from "@angular/router";
import { NotFoundPageComponent } from "../../app/not-found-page/not-found-page.component";

export const ROUTES: Routes = [
    {
        path: "",
        component: BaseComponent,
        resolve: {
            base: BaseResolver,
        },
        children: [
            {
                path: "",
                component: HomeComponent,
                pathMatch: "full",
            },
            {
                path: "favorites",
                component: FavoritesComponent,
            },
            {
                path: "not-found",
                component: NotFoundPageComponent,
            },
            {
                path: "**",
                redirectTo: "/not-found",
            },
        ],
    },
];
