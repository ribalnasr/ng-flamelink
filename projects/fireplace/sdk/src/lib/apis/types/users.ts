import { UpdateRequest, CreateRequest } from './auth';

export type UsersApiAction = 'UPDATE' | 'CREATE' | 'DELETE';

export interface UsersApiOptionsBase {
    action: UsersApiAction;
    payload?: any;
}

export interface UpdatePayloadData extends UpdateRequest {
    [key: string]: any;
}


export interface UpdatePayload {
    uid: string;
    data: UpdatePayloadData;
}

export interface UsersUpdateOptions extends UsersApiOptionsBase {
    action: 'UPDATE';
    payload: UpdatePayload;
}

export interface CreatePayload extends CreateRequest {
    [key: string]: any;
}

export interface UsersCreateOptions extends UsersApiOptionsBase {
    action: 'CREATE';
    payload: CreatePayload;
}

export interface DeletePayload {
    uid: string;
}


export interface UsersDeleteOptions extends UsersApiOptionsBase {
    action: 'DELETE';
    payload: DeletePayload;
}

export type UsersApiOptions = UsersUpdateOptions | UsersCreateOptions | UsersDeleteOptions;
