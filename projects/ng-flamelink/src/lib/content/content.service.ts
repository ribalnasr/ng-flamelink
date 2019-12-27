import { Injectable } from '@angular/core';
import { FLApp } from '../app.service';
import Content from '@flamelink/sdk-content-types';
import App from '@flamelink/sdk-app-types';
import { FLExtend } from '../extend.service';
import { Observable } from 'rxjs';

interface Subscribe extends Content.CF.Get {
    changeType?: string
    // Removed mandatory callback from Content.CF.Subscribe
}

@Injectable({
    providedIn: 'root'
})
export class FLContent {

    constructor(
        private flamelink: FLApp,
        private extend: FLExtend
    ) { }

    public ref(reference?: string | string[], options?: App.CF.Options | App.RTDB.Options) {
        return this.flamelink.content.ref(reference, options);
    }

    public async add<T>(options: Content.CF.Add | Content.RTDB.Add) {
        const res: T = await this.flamelink.content.add(options);
        this.extend.log({
            action: 'CONTENT.CREATE',
            payload: options,
            result: res
        });
        return res;
    }

    public async get<T>(options: Content.CF.Get | Content.RTDB.Get) {
        const res: T = await this.flamelink.content.get(options);
        this.extend.log({
            action: 'CONTENT.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async getRaw<T>(options: Content.CF.Get | Content.RTDB.Get) {
        const res: T = await this.flamelink.content.getRaw(options);
        this.extend.log({
            action: 'CONTENT.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async getByField<T>(options: Content.CF.GetByField | Content.RTDB.GetByField) {
        const res: T = await this.flamelink.content.getByField(options);
        this.extend.log({
            action: 'CONTENT.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async getByFieldRaw<T>(options: Content.CF.GetByField | Content.RTDB.GetByField) {
        const res: T = await this.flamelink.content.getByFieldRaw(options);
        this.extend.log({
            action: 'CONTENT.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async update<T>(options: Content.CF.Update | Content.RTDB.Update) {
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

    public subscribe<T>(options: Subscribe | Content.RTDB.Get) {
        return new Observable<T>(o => {
            this.flamelink.content.subscribe({
                ...options,
                callback: async (err, res) => {
                    if (err) {
                        o.error(err);
                        return;
                    }
                    o.next(res);
                    this.extend.log({
                        action: 'CONTENT.READ',
                        payload: options,
                        result: res
                    });
                }
            });
        })
    }

    public subscribeRaw<T>(options: Subscribe | Content.RTDB.Get) {
        return new Observable<T>(o => {
            this.flamelink.content.subscribeRaw({
                ...options,
                callback: async (err, res) => {
                    if (err) {
                        o.error(err);
                        return;
                    }
                    o.next(res);
                    this.extend.log({
                        action: 'CONTENT.READ',
                        payload: options,
                        result: res
                    });
                }
            });
        })
    }

}
