import { Injectable } from '@angular/core';
import { FLApp } from '../app.service';
import { FLExtend } from 'ng-flamelink/extend.service';
import Users from '@flamelink/sdk-users-types';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FLUsers {

    constructor(
        private flamelink: FLApp,
        private extend: FLExtend,
        public fireAuth: AngularFireAuth
    ) { }

    public _getPermissionsRef(permission?: string) {
        return this.flamelink.users._getPermissionsRef(permission);
    }

    public addToDB(options: Users.CF.Add | Users.RTDB.Add) {
        return this.flamelink.users.addToDB(options);
    }

    public get(options?: Users.CF.Get | Users.RTDB.Get) {
        return this.flamelink.users.get(options);
    }

    public getRaw(options?: Users.CF.Get | Users.RTDB.Get) {
        return this.flamelink.users.getRaw(options);
    }

    public removeFromDB(options: Users.CF.Remove | Users.RTDB.Remove) {
        return this.flamelink.users.removeFromDB(options);
    }

    public subscribe(options?: Users.CF.Subscribe | Users.RTDB.Subscribe) {
        return this.flamelink.users.subscribe(options);
    }

    public subscribeRaw(options: Users.CF.Subscribe | Users.RTDB.Subscribe) {
        return this.flamelink.users.subscribeRaw(options);
    }

    public updateInDB(options: Users.CF.Update | Users.RTDB.Update) {
        return this.flamelink.users.updateInDB(options);
    }

    public ref(uid?: string) {
        return this.flamelink.users.ref(uid);
    }



}
