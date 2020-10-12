import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { FireplaceModule } from '@fireplace/sdk';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FireplaceModule.initialize({
      firebaseApp: environment.firebase,
      dbType: 'cf'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
