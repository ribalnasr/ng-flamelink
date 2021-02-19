import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { FlamelinkModule } from 'ng-flamelink';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FlamelinkModule.initialize({
      firebaseApp: environment.firebase,
      dbType: 'cf'
    })
    // FireplaceModule.initialize({
    //   firebaseApp: environment.firebase,
    //   dbType: 'cf'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
