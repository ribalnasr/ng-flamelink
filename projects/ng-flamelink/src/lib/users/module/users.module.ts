import { NgModule } from '@angular/core';
import { FLUsers } from '../users.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import 'flamelink/users';


@NgModule({
    providers: [
        FLUsers
    ],
    imports: [
        AngularFireAuthModule
    ]
})
export class FLUsersModule { }
