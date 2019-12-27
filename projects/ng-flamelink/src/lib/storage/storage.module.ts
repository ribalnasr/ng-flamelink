import { NgModule } from '@angular/core';
import { FLStorage } from './storage.service';
import 'flamelink/storage';
import 'firebase/storage';


@NgModule({
    providers: [
        FLStorage
    ]
})
export class FLStorageModule { }
