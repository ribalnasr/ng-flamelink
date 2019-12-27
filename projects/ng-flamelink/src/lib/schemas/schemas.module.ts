import { NgModule } from '@angular/core';
import { FLSchemas } from './schemas.service';
import 'flamelink/schemas';


@NgModule({
    providers: [
        FLSchemas
    ]
})
export class FLSchemasModule { }
