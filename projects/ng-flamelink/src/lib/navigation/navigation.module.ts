import { NgModule } from '@angular/core';
import { FLNavigation } from './navigation.service';
import 'flamelink/navigation';


@NgModule({
    providers: [
        FLNavigation
    ]
})
export class FLNavigationModule { }
