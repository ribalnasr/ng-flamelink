import { Injectable, Injector } from '@angular/core';
import { FLApp } from '../app.service';
import * as Storage from '@flamelink/sdk-storage-types';
import * as App from '@flamelink/sdk-app-types';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class FLStorage {

    constructor(
        private flamelink: FLApp,
        public fireStorage: AngularFireStorage,
        public injector: Injector,

    ) { }

    public get UploadEvents() {
        return this.flamelink.storage.UploadEvents;
    }

    public ref(filename: string, options?: Storage.ImageSize) {
        return this.flamelink.storage.ref(filename, options);
    }

    public deleteFile(options: Storage.CF.GetFile | Storage.RTDB.GetFile) {
        return this.flamelink.storage.deleteFile(options);
    }

    public fileRef(fileId?: string) {
        return this.flamelink.storage.fileRef(fileId);
    }

    public folderRef(folderId?: string) {
        return this.flamelink.storage.folderRef(folderId);
    }

    public getFile(options: Storage.CF.GetFile | Storage.RTDB.GetFile) {
        return this.flamelink.storage.getFile(options);
    }

    public getFileRaw(options: Storage.CF.GetFile | Storage.RTDB.GetFile) {
        return this.flamelink.storage.getFileRaw(options);
    }

    public getFiles(options: Storage.CF.GetFile | Storage.RTDB.GetFile) {
        return this.flamelink.storage.getFiles(options);
    }

    public getFilesRaw(options: Storage.CF.GetFile | Storage.RTDB.GetFile) {
        return this.flamelink.storage.getFilesRaw(options);
    }

    public getFolders(options: App.CF.Options | App.RTDB.Options) {
        return this.flamelink.storage.getFolders(options);
    }

    public getFoldersRaw(options: App.CF.Options | App.RTDB.Options) {
        return this.flamelink.storage.getFoldersRaw(options);
    }

    public getMetadata(options: Storage.CF.GetMetadata | Storage.RTDB.GetMetadata) {
        return this.flamelink.storage.getMetadata(options);
    }

    public getURL(options: Storage.CF.GetURL | Storage.RTDB.GetURL) {
        return this.flamelink.storage.getURL(options);
    }

    public updateMetadata(options: Storage.CF.UpdateMetadata | Storage.RTDB.UpdateMetadata) {
        return this.flamelink.storage.updateMetadata(options);
    }

    public upload(fileData: any, options: Storage.UploadOptions) {
        return this.flamelink.storage.upload(fileData, options);
    }

}
