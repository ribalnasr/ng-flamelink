import { NgModule } from '@angular/core';
import { FLContent } from './content.service';
import 'flamelink/content';

@NgModule({
    providers: [
        FLContent
    ]
})
export class FLContentModule { }
