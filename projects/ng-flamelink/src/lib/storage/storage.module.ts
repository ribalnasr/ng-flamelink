import { NgModule } from '@angular/core';
import { FLStorage } from './storage.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import 'flamelink/storage';


@NgModule({
    providers: [
        FLStorage
    ],
    imports: [
        AngularFireStorageModule
    ]
})
export class FLStorageModule { }
