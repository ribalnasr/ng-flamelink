import { NgModule } from '@angular/core';
import { FLSettings } from './settings.service';
import 'flamelink/settings';


@NgModule({
    providers: [
        FLSettings
    ]
})
export class FLSettingsModule { }
