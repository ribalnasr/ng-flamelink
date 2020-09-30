import { Injectable, NgZone } from '@angular/core';
import { FLApp } from '../app.service';
import * as Schemas from '@flamelink/sdk-schemas-types';
import { Observable } from 'rxjs';

interface SchemasSubscribe extends Schemas.CF.Get {
    changeType?: string
    // Removed mandatory callback from Content.CF.Subscribe
}


@Injectable({
    providedIn: 'root'
})
export class FLSchemas {

    constructor(
        private zone: NgZone,
        private flamelink: FLApp,
    ) { }

    private objectToArray<T>(entries: Record<string, Schemas.SchemaCf> | Schemas.SchemaCf, options: SchemasSubscribe) {
        let single = !!options?.schemaKey;
        let data: any = single ? null : [];
        if (entries) {
            data = single ? entries : Object.values(entries);
        }

        if (single) {
            return data as T;
        } else {
            return data as T[];
        }
    }


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

    public valueChanges(options?: SchemasSubscribe | Schemas.RTDB.Subscribe) {
        return new Observable<Schemas.SchemaCf[] | Schemas.SchemaCf>(o => {
            this.zone.runOutsideAngular(async () => {
                this.flamelink.schemas.subscribe({
                    ...options,
                    callback: async (err, res: Record<string, Schemas.SchemaCf>) => {
                        if (err) {
                            o.error(err);
                            return;
                        }

                        const data = this.objectToArray<Schemas.SchemaCf>(res, options)
                        this.zone.runTask(() => {
                            o.next(data);
                        })
                    }
                });
            });
        })
    }

    public valueChangesRaw(options?: SchemasSubscribe | Schemas.RTDB.Subscribe) {
        return new Observable<Schemas.SchemaCf[] | Schemas.SchemaCf>(o => {
            this.zone.runOutsideAngular(async () => {
                this.flamelink.schemas.subscribeRaw({
                    ...options,
                    callback: async (err, res: Record<string, Schemas.SchemaCf>) => {
                        if (err) {
                            o.error(err);
                            return;
                        }

                        const data = this.objectToArray<Schemas.SchemaCf>(res, options)
                        this.zone.runTask(() => {
                            o.next(data);
                        })
                    }
                });
            });
        })
    }

    public valueChangesFields(options?: SchemasSubscribe | Schemas.RTDB.Subscribe) {
        return new Observable<Schemas.SchemaField[] | Schemas.SchemaField>(o => {
            this.zone.runOutsideAngular(async () => {
                this.flamelink.schemas.subscribeFields({
                    ...options,
                    callback: async (err, res: Record<string, Schemas.SchemaCf>) => {
                        if (err) {
                            o.error(err);
                            return;
                        }

                        const data = this.objectToArray<Schemas.SchemaField>(res, options)
                        this.zone.runTask(() => {
                            o.next(data);
                        })
                    }
                });
            });
        })
    }

    public update(options: Schemas.CF.Update | Schemas.RTDB.Update) {
        return this.flamelink.schemas.update(options);
    }

    // Deprecated

    public subscribe(options?: Schemas.CF.Subscribe | Schemas.RTDB.Subscribe) {
        return this.flamelink.schemas.subscribe(options);
    }

    public subscribeRaw(options?: Schemas.CF.Subscribe | Schemas.RTDB.Subscribe) {
        return this.flamelink.schemas.subscribeRaw(options);
    }

    public subscribeFields(options?: Schemas.CF.Subscribe | Schemas.RTDB.Subscribe) {
        return this.flamelink.schemas.subscribeFields(options);
    }

}
