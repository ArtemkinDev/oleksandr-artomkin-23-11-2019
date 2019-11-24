import { JsonHelper } from "./../helpers/json.helper";
import { KeyValueInterface } from "./../interfaces/key-value.interface";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LocalstorageService {
    private localstorage: Storage = window.localStorage;

    public get(name: string): KeyValueInterface<any> {
        const userParams: any = this.localstorage.getItem(name);
        const params: KeyValueInterface<any> = JsonHelper.parse(userParams);
        return params;
    }

    public set(name: string, value: KeyValueInterface<string>): KeyValueInterface<string> {
        this.localstorage.setItem(name, JSON.stringify(value));
        return value;
    }

    public delete(name: string): void {
        this.localstorage.removeItem(name);
    }
}
