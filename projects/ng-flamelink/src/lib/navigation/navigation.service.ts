import { Injectable } from '@angular/core';
import { FLApp } from '../app.service';
import * as Navigation from '@flamelink/sdk-navigation-types';

@Injectable({
    providedIn: 'root'
})
export class FLNavigation {

    constructor(
        private flamelink: FLApp,
    ) { }

    public ref(reference?: string | string[]) {
        return this.flamelink.nav.ref(reference);
    }

    public add(options: Navigation.CF.Add | Navigation.RTDB.Add) {
        return this.flamelink.nav.add(options);
    }

    public get(options?: Navigation.CF.Get | Navigation.RTDB.Get) {
        return this.flamelink.nav.get(options);
    }

    public getItems(options: Navigation.CF.Get | Navigation.RTDB.Get) {
        return this.flamelink.nav.getItems(options);
    }

    public getItemsRaw(options: Navigation.CF.Get | Navigation.RTDB.Get) {
        return this.flamelink.nav.getItemsRaw(options);
    }

    public getRaw(options: Navigation.CF.Get | Navigation.RTDB.Get) {
        return this.flamelink.nav.getRaw(options);
    }

    public remove(options: Navigation.CF.Remove | Navigation.RTDB.Remove) {
        return this.flamelink.nav.remove(options);
    }

    public subscribe(options?: Navigation.CF.Subscribe | Navigation.RTDB.Subscribe) {
        return this.flamelink.nav.subscribe(options);
    }

    public subscribeRaw(options: Navigation.CF.Subscribe | Navigation.RTDB.Subscribe) {
        return this.flamelink.nav.subscribeRaw(options);
    }

    public update(options: Navigation.CF.Update | Navigation.RTDB.Update) {
        return this.flamelink.nav.update(options);
    }


}
