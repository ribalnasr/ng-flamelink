import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FlamelinkModule } from 'ng-flamelink';
import { FLContentModule } from 'ng-flamelink/content/module';
import { FLUsersModule } from 'ng-flamelink/users/module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
