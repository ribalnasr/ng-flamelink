import { Injectable, NgZone } from '@angular/core';
import { FLApp } from '../app.service';
import * as Settings from '@flamelink/sdk-settings-types';

@Injectable({
    providedIn: 'root'
})
export class FLSettings {

    constructor(
        private zone: NgZone,
        private flamelink: FLApp,
    ) { }

    public ref(reference: string) {
        return this.flamelink.settings.ref(reference);
    }

    public get(options?: Settings.CF.Get | Settings.RTDB.Get) {
        return new Promise((resolve, reject) => {
            this.zone.runOutsideAngular(() => {
                this.flamelink.settings.get(options)
                    .then(result => this.zone.runTask(() => resolve(result)))
                    .catch(error => this.zone.runTask(() => reject(error)));
            })
        })
    }

    public getAvailableLocales() {
        return new Promise((resolve, reject) => {
            this.zone.runOutsideAngular(() => {
                this.flamelink.settings.getAvailableLocales()
                    .then(result => this.zone.runTask(() => resolve(result)))
                    .catch(error => this.zone.runTask(() => reject(error)));
            })
        })
    }

    public getDefaultPermissionsGroup() {
        return this.flamelink.settings.getDefaultPermissionsGroup();
    }

    public getEnvironment() {
        return this.flamelink.settings.getEnvironment();
    }

    public getGlobals() {
        return this.flamelink.settings.getGlobals();
    }

    public getImageSizes() {
        return this.flamelink.settings.getImageSizes();
    }

    public getLocale() {
        return new Promise((resolve, reject) => {
            this.zone.runOutsideAngular(() => {
                this.flamelink.settings.getLocale()
                    .then(result => this.zone.runTask(() => resolve(result)))
                    .catch(error => this.zone.runTask(() => reject(error)));
            })
        })
    }

    public getRaw(options: Settings.CF.Get | Settings.RTDB.Get) {
        return this.flamelink.settings.getRaw(options);
    }

    public setEnvironment(env: string) {
        return this.flamelink.settings.setEnvironment(env);
    }

    public setLocale(locale: string) {
        return this.flamelink.settings.setLocale(locale);
    }

    public subscribe(options?: Settings.CF.Subscribe | Settings.RTDB.Subscribe) {
        return this.flamelink.settings.subscribe(options);
    }

    public subscribeDefaultPermissionsGroup(options?: Settings.CF.Subscribe | Settings.RTDB.Subscribe) {
        return this.flamelink.settings.subscribeDefaultPermissionsGroup(options);
    }

    public subscribeGlobals(options?: Settings.CF.Subscribe | Settings.RTDB.Subscribe) {
        return this.flamelink.settings.subscribeGlobals(options);
    }

    public subscribeImageSizes(options?: Settings.CF.Subscribe | Settings.RTDB.Subscribe) {
        return this.flamelink.settings.subscribeImageSizes(options);
    }

    public subscribeRaw(options: Settings.CF.Subscribe | Settings.RTDB.Subscribe) {
        return this.flamelink.settings.subscribeRaw(options);
    }

}
