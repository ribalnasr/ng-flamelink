import { NgModule } from '@angular/core';
import { FLUsers } from './users.service';
import 'flamelink/users';
import 'firebase/auth';


@NgModule({
    providers: [
        FLUsers
    ]
})
export class FLUsersModule { }
