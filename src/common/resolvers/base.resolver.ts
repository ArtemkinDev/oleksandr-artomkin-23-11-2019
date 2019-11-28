import { AppStateService } from "./../services/app-state.service";
import { UserService } from "./../services/user.service";
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import { LocalstorageService } from "../services/localstorage.service";

@Injectable({ providedIn: "root" })
export class BaseResolver implements Resolve<Observable<boolean>> {
    constructor(
        private userService: UserService,
        private localstorageService: LocalstorageService,
        private appState: AppStateService
    ) {}

    public resolve(): Observable<boolean> {
        if (!this.userService.checkIfUserSettingsExist()) {
            this.userService.createUserSettings();
        } else {
            this.appState.setUserSettings(this.localstorageService.get("userSettings"));
        }
        return of<boolean>(true);
    }
}
