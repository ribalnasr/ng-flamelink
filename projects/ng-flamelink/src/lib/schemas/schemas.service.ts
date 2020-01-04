import { Injectable } from '@angular/core';
import { FLApp } from '../app.service';
import * as Schemas from '@flamelink/sdk-schemas-types';

@Injectable({
    providedIn: 'root'
})
export class FLSchemas {

    constructor(
        private flamelink: FLApp,
    ) { }

    public ref(reference?: string) {
        return this.flamelink.schemas.ref(reference);
    }

    public add(options: Schemas.CF.Add | Schemas.RTDB.Add) {
        return this.flamelink.schemas.add(options);
    }

    public get(options?: Schemas.CF.Get | Schemas.RTDB.Get) {
        return this.flamelink.schemas.get(options);
    }

    public getFields(options: Schemas.CF.Get | Schemas.RTDB.Get) {
        return this.flamelink.schemas.getFields(options);
    }

    public getFieldsRaw(options: Schemas.CF.Get | Schemas.RTDB.Get) {
        return this.flamelink.schemas.getFieldsRaw(options);
    }

    public getRaw(options: Schemas.CF.Get | Schemas.RTDB.Get) {
        return this.flamelink.schemas.getRaw(options);
    }

    public remove(options: Schemas.CF.Remove | Schemas.RTDB.Remove) {
        return this.flamelink.schemas.remove(options);
    }

    public subscribe(options?: Schemas.CF.Subscribe | Schemas.RTDB.Subscribe) {
        return this.flamelink.schemas.subscribe(options);
    }

    public subscribeFields(options?: Schemas.CF.Subscribe | Schemas.RTDB.Subscribe) {
        return this.flamelink.schemas.subscribeFields(options);
    }

    public subscribeRaw(options: Schemas.CF.Subscribe | Schemas.RTDB.Subscribe) {
        return this.flamelink.schemas.subscribeRaw(options);
    }

    public update(options: Schemas.CF.Update | Schemas.RTDB.Update) {
        return this.flamelink.schemas.update(options);
    }

}
