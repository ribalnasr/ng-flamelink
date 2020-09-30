import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { FLApp } from '../app.service';
import * as Content from '@flamelink/sdk-content-types';
import * as App from '@flamelink/sdk-app-types';
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

export type ContentMiddlewareName = 'beforeRead' | 'afterRead' | 'beforeCreate' | 'afterCreate' | 'beforeUpdate' | 'afterUpdate' | 'beforeDelete' | 'afterDelete';

export type OptionsTypes = Content.CF.Get | Content.RTDB.Get | Content.CF.Get | Content.RTDB.Get | Content.CF.Add | Content.RTDB.Add | Content.CF.Add | Content.RTDB.Add | Content.CF.Update | Content.RTDB.Update | Content.CF.Update | Content.RTDB.Update | Content.CF.Remove | Content.RTDB.Remove | Content.CF.Remove | Content.RTDB.Remove;

export type Middleware<OptionsType extends OptionsTypes = OptionsTypes> = (options: OptionsType) => any;
export type MiddlewareWithData<OptionsType extends OptionsTypes = OptionsTypes, DataType = any> = (options: OptionsType, data: DataType) => any;

export type Middlewares = Partial<Record<ContentMiddlewareName, Middleware | MiddlewareWithData>>;

export interface ContentMiddlewares extends Middlewares {
    beforeRead?: Middleware<Content.CF.Get | Content.RTDB.Get>;
    afterRead?: MiddlewareWithData<Content.CF.Get | Content.RTDB.Get>;
    beforeCreate?: Middleware<Content.CF.Add | Content.RTDB.Add>;
    afterCreate?: MiddlewareWithData<Content.CF.Add | Content.RTDB.Add>;
    beforeUpdate?: Middleware<Content.CF.Update | Content.RTDB.Update>;
    afterUpdate?: Middleware<Content.CF.Update | Content.RTDB.Update>;
    beforeDelete?: Middleware<Content.CF.Remove | Content.RTDB.Remove>;
    afterDelete?: Middleware<Content.CF.Remove | Content.RTDB.Remove>;
}


@Injectable({
    providedIn: 'root'
})
export class FLContent {

    public middlewares: ContentMiddlewares = {};

    constructor(
        private zone: NgZone,
        private flamelink: FLApp,
        private settings: FLSettings,
        public firestore: AngularFirestore,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    public get isBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    public runMiddleware<Options extends OptionsTypes, DataType = any>(name: ContentMiddlewareName, options: Options, data?: DataType) {
        const middleware = this.middlewares[name] as MiddlewareWithData<Options> | Middleware<Options>;
        return Promise.resolve(middleware && middleware(options, data));
    };

    private objectToArray<T extends Document | Document[] = Document[]>(entries: T, options: Content.CF.Get) {
        let single = !!options.entryId;
        if (!Array.isArray(entries)) {
            if ((entries as Document)?._fl_meta_?.schemaType === 'single') {
                single = true;
            }
        }

        let data: any = single ? null : [];
        if (entries) {
            data = single ? entries : Object.values(entries);
        }

        return data as T;
    }

    public ref(id: string) {
        return this.firestore.collection('fl_content').doc(id).ref;
    }

    public async add<T extends Document = Document>(options: Content.CF.Add | Content.RTDB.Add) {
        await this.runMiddleware('beforeCreate', options)
        const data: T = await this.flamelink.content.add(options);
        this.runMiddleware('afterCreate', options, data)
        return data;
    }

    public async get<T extends Document | Document[] = Document[]>(options: Content.CF.Get | Content.RTDB.Get) {
        await this.runMiddleware('beforeRead', options)
        const data: T = this.objectToArray(await this.flamelink.content.get(options), options);
        this.runMiddleware('afterRead', data)
        return data
    }

    public async getRaw<T extends Document | Document[] = Document[]>(options: Content.CF.Get | Content.RTDB.Get) {
        await this.runMiddleware('beforeRead', options)
        const data: T = await this.flamelink.content.getRaw(options);
        this.runMiddleware('afterRead', options, data)
        return data;
    }

    public async getByField<T extends Document | Document[] = Document[]>(options: Content.CF.GetByField | Content.RTDB.GetByField) {
        await this.runMiddleware('beforeRead', options)
        const data: T = await this.flamelink.content.getByField(options);
        this.runMiddleware('afterRead', options, data)
        return data;
    }

    public async getByFieldRaw<T extends Document | Document[] = Document[]>(options: Content.CF.GetByField | Content.RTDB.GetByField) {
        await this.runMiddleware('beforeRead', options)
        const data: T = await this.flamelink.content.getByFieldRaw(options);
        this.runMiddleware('afterRead', options, data)
        return data;
    }

    public async update<T extends Document = Document>(options: Content.CF.Update | Content.RTDB.Update) {
        await this.runMiddleware('beforeUpdate', options);
        const data: T = await this.flamelink.content.update(options);
        this.runMiddleware('afterUpdate', options);
        return data;
    }

    public async remove(options: Content.CF.Remove | Content.RTDB.Remove) {
        await this.runMiddleware('beforeDelete', options);
        const data = await this.flamelink.content.remove(options);
        this.runMiddleware('afterDelete', options);
        return data;
    }

    public valueChanges<T extends Document | Document[] = Document[]>(options: ContentSubscribe | Content.RTDB.Get) {
        return this.settings.localeChanges.pipe(
            switchMap(
                () => {
                    return new Observable<T>(o => {
                        this.zone.runOutsideAngular(async () => {
                            await this.runMiddleware('beforeRead', options)
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
                                        this.runMiddleware('afterRead', options, data);
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
                    this.zone.runOutsideAngular(async () => {
                        await this.runMiddleware('beforeRead', options)
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
                                    this.runMiddleware('afterRead', options, data)
                                })
                            }
                        });
                    });
                })
            )
        );



    }

}
