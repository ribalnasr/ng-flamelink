import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FlamelinkModule, FLUsersModule, FLContentModule } from 'ng-flamelink';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FlamelinkModule.initialize({
      firebaseApp: environment.firebase,
      dbType: 'cf'
    }),
    FLContentModule,
    FLUsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
