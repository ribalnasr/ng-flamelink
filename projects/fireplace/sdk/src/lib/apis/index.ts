import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { UsersApiOptions } from './types/users';

@Injectable({
    providedIn: 'root'
})
export class FPApis {

    constructor(
        private functions: AngularFireFunctions
    ) { }

    public async users(options: UsersApiOptions) {
        const res = await this.functions.httpsCallable('fireplace-apis-users')(options)
            .toPromise();
        if (res.error) {
            throw res.error;
        }
        return res;
    }

}
