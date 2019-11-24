import { UserService } from "./../services/user.service";
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class BaseResolver implements Resolve<Observable<boolean>> {
    constructor(private userService: UserService) {}

    public resolve(): Observable<boolean> {
        if (!this.userService.checkIfUserSettingsExist()) {
            this.userService.createUserSettings();
        }
        return of<boolean>(true);
    }
}
