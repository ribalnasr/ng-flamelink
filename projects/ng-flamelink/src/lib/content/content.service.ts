import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { FLApp } from '../app.service';
import * as Content from '@flamelink/sdk-content-types';
import { FLExtend } from '../extend.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Document } from './document.interface';
import { isPlatformBrowser } from '@angular/common';
import { FLSettings } from '../settings/settings.service';
import { switchMap } from 'rxjs/operators';

interface ContentSubscribe extends Content.CF.Get {
    changeType?: string
    // Removed mandatory callback from Content.CF.Subscribe
}

export type MiddlewareName = 'beforeRead' | 'afterRead' | 'beforeCreate' | 'afterCreate' | 'beforeUpdate' | 'afterUpdate' | 'beforeDelete' | 'afterDelete';

export type beforeReadFn = () => any;
export type afterReadFn = (data: any) => any;
export type beforeCreateFn = () => any;
export type afterCreateFn = (data: any) => any;
export type beforeUpdateFn = () => any;
export type afterUpdateFn = () => any;
export type beforeDeleteFn = () => any;
export type afterDeleteFn = () => any;

export interface Middlewares {
    beforeRead?: beforeReadFn;
    afterRead?: afterReadFn;
    beforeCreate?: beforeCreateFn;
    afterCreate?: afterCreateFn;
    beforeUpdate?: beforeUpdateFn;
    afterUpdate?: afterUpdateFn;
    beforeDelete?: beforeDeleteFn;
    afterDelete?: afterDeleteFn;
}

@Injectable({
    providedIn: 'root'
})
export class FLContent {

    public middlewares: Middlewares = {};

    constructor(
        private zone: NgZone,
        private flamelink: FLApp,
        private settings: FLSettings,
        private extend: FLExtend,
        public firestore: AngularFirestore,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    public get isBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    private objectToArray<T extends Document | Document[] = Document[]>(entries: T, options: Content.CF.Get) {
        let single = !!options.entryId;
        if (!Array.isArray(entries)) {
            if ((entries as Document)?._fl_meta_?.schemaType === 'single') {
                single = true;
            }
        }

        let data: any = single ? null : [];
        if (entries) {
            data = single ? entries : Object.keys(entries).map(i => entries[i]);
        }

        return data as T;

    }

    public ref(id: string) {
        return this.firestore.collection('fl_content').doc(id).ref;
    }

    public async add<T extends Document = Document>(options: Content.CF.Add | Content.RTDB.Add) {
        const res: T = await this.flamelink.content.add(options);
        this.extend.log({
            action: 'CONTENT.CREATE',
            payload: options,
            result: res
        });
        return res;
    }

    public async get<T extends Document | Document[] = Document[]>(options: Content.CF.Get | Content.RTDB.Get) {
        const res: T = await this.flamelink.content.get(options);
        this.extend.log({
            action: 'CONTENT.READ',
            payload: options,
            result: res
        });
        return this.objectToArray(res, options);
    }

    public async getRaw<T extends Document | Document[] = Document[]>(options: Content.CF.Get | Content.RTDB.Get) {
        const res: T = await this.flamelink.content.getRaw(options);
        this.extend.log({
            action: 'CONTENT.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async getByField<T extends Document | Document[] = Document[]>(options: Content.CF.GetByField | Content.RTDB.GetByField) {
        const res: T = await this.flamelink.content.getByField(options);
        this.extend.log({
            action: 'CONTENT.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async getByFieldRaw<T extends Document | Document[] = Document[]>(options: Content.CF.GetByField | Content.RTDB.GetByField) {
        const res: T = await this.flamelink.content.getByFieldRaw(options);
        this.extend.log({
            action: 'CONTENT.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async update<T extends Document = Document>(options: Content.CF.Update | Content.RTDB.Update) {
        const res: T = await this.flamelink.content.update(options);
        this.extend.log({
            action: 'CONTENT.UPDATE',
            payload: options,
            result: res
        });
        return res;
    }

    public async remove(options: Content.CF.Remove | Content.RTDB.Remove) {
        const res = await this.flamelink.content.remove(options);
        this.extend.log({
            action: 'CONTENT.DELETE',
            payload: options,
            result: res
        });
        return res;
    }

    public valueChanges<T extends Document | Document[] = Document[]>(options: ContentSubscribe | Content.RTDB.Get) {
        return this.settings.localeChanges.pipe(
            switchMap(
                () => {
                    return new Observable<T>(o => {
                        this.zone.runOutsideAngular(async () => {
                            await Promise.resolve(this.middlewares?.beforeRead && this.middlewares?.beforeRead())
                            this.flamelink.content.subscribe({
                                ...options,
                                callback: async (err, res) => {
                                    if (err) {
                                        o.error(err);
                                        return;
                                    }

                                    const data = this.objectToArray<T>(res, options);
                                    this.zone.runTask(() => {
                                        o.next(data);
                                        Promise.resolve(this.middlewares?.afterRead && this.middlewares?.afterRead(data))
                                    })
                                }
                            });
                        });
                    })
                }
            )
        );



    }

    public valueChangesRaw<T extends Document | Document[] = Document[]>(options: ContentSubscribe | Content.RTDB.Get) {
        return this.settings.localeChanges.pipe(
            switchMap(
                () => new Observable<T>(o => {
                    this.zone.runOutsideAngular(() => {
                        this.flamelink.content.subscribeRaw({
                            ...options,
                            callback: async (err, res) => {
                                if (err) {
                                    o.error(err);
                                    return;
                                }

                                let single = !!options.entryId;
                                if (res && res._fl_meta_) {
                                    if (res._fl_meta_.schemaType === 'single') {
                                        single = true;
                                    }
                                }

                                let data = single ? null : [] as any as T;
                                if (res) {
                                    data = single ? res : Object.keys(res).map(i => res[i]);
                                }

                                this.zone.runTask(() => {
                                    o.next(data);
                                    this.extend.log({
                                        action: 'CONTENT.READ',
                                        payload: options,
                                        result: res
                                    });
                                })
                            }
                        });
                    });
                })
            )
        );



    }

}
