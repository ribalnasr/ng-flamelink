import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FlamelinkModule } from 'ng-flamelink';
import { FLContentModule } from 'ng-flamelink/content';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlamelinkModule.forRoot({
      firebaseApp: environment.firebase,
      dbType: 'cf'
    }),
    FLContentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
