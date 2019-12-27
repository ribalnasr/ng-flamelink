import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FLExtend {

    public onLog = new Subject<FLLog>();
    public log(log: FLLog) {
        this.onLog.next(log);
    }

}

export interface FLLog {
    action: FLAction;
    payload: any;
    result: any;
}

export type FLAction = FLContentAction | FLUsersAction;
export type FLContentAction = 'CONTENT.READ' | 'CONTENT.CREATE' | 'CONTENT.UPDATE' | 'CONTENT.DELETE';
export type FLUsersAction = 'USERS.READ' | 'USERS.CREATE' | 'USERS.UPDATE' | 'USERS.DELETE';

export enum FL_CONTENT_ACTIONS {
    READ = 'CONTENT.READ',
    WRITE = 'CONTENT.CREATE',
    UPDATE = 'CONTENT.UPDATE',
    DELETE = 'CONTENT.DELETE',
}

export enum FL_USERS_ACTIONS {
    READ = 'USERS.READ',
    WRITE = 'USERS.CREATE',
    UPDATE = 'USERS.UPDATE',
    DELETE = 'USERS.DELETE',
}
