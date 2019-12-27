import { Injectable } from '@angular/core';
import { FLApp } from '../app.service';
import Settings from '@flamelink/sdk-settings-types';

@Injectable({
    providedIn: 'root'
})
export class FLSettings {

    constructor(
        private flamelink: FLApp,
    ) { }

    public ref(reference: string) {
        return this.flamelink.settings.ref(reference);
    }

    public get(options?: Settings.CF.Get | Settings.RTDB.Get) {
        return this.flamelink.settings.get(options);
    }

    public getAvailableLocales() {
        return this.flamelink.settings.getAvailableLocales();
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
        return this.flamelink.settings.getLocale();
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
