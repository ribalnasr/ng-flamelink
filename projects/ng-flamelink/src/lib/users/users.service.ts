import { Injectable } from '@angular/core';
import { FLApp } from '../app.service';
import { FLExtend } from '../extend.service';
import Users from '@flamelink/sdk-users-types';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

interface UsersSubscribe extends Users.CF.Get {
    changeType?: string
    // Removed mandatory callback from Users.CF.Subscribe
}

@Injectable({
    providedIn: 'root'
})
export class FLUsers {

    constructor(
        private flamelink: FLApp,
        private extend: FLExtend,
        public firestore: AngularFirestore,
        public fireAuth: AngularFireAuth
    ) { }

    public _getPermissionsRef(permission?: string) {
        return this.flamelink.users._getPermissionsRef(permission);
    }

    public ref(uid: string) {
        return this.firestore.collection('fl_users').doc(uid).ref;
    }

    public async add<T>(options: Users.CF.Add | Users.RTDB.Add) {
        const res: T = await this.flamelink.users.addToDB(options);
        this.extend.log({
            action: 'USERS.CREATE',
            payload: options,
            result: res
        });
        return res;
    }

    public async get<T>(options?: Users.CF.Get | Users.RTDB.Get) {
        const res: T = await this.flamelink.users.get(options);
        this.extend.log({
            action: 'USERS.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async getRaw<T>(options?: Users.CF.Get | Users.RTDB.Get) {
        const res: T = await this.flamelink.users.getRaw(options);
        this.extend.log({
            action: 'USERS.READ',
            payload: options,
            result: res
        });
        return res;
    }

    public async update<T>(options: Users.CF.Update | Users.RTDB.Update) {
        const res: T = await this.flamelink.users.updateInDB(options);
        this.extend.log({
            action: 'USERS.UPDATE',
            payload: options,
            result: res
        });
        return res;
    }

    public async removeFromDB(options: Users.CF.Remove | Users.RTDB.Remove) {
        const res = await this.flamelink.users.removeFromDB(options);
        this.extend.log({
            action: 'USERS.DELETE',
            payload: options,
            result: res
        });
        return res;
    }

    public valueChanges<T>(options: UsersSubscribe | Users.RTDB.Get) {
        return new Observable<T>(o => {
            this.flamelink.users.subscribe({
                ...options,
                callback: async (err, res) => {
                    if (err) {
                        o.error(err);
                        return;
                    }
                    o.next(res);
                    this.extend.log({
                        action: 'USERS.READ',
                        payload: options,
                        result: res
                    });
                }
            });
        })
    }

    public valueChangesRaw<T>(options: UsersSubscribe | Users.RTDB.Get) {
        return new Observable<T>(o => {
            this.flamelink.users.subscribeRaw({
                ...options,
                callback: async (err, res) => {
                    if (err) {
                        o.error(err);
                        return;
                    }
                    o.next(res);
                    this.extend.log({
                        action: 'USERS.READ',
                        payload: options,
                        result: res
                    });
                }
            });
        })
    }

}
