import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import 'firebase/firestore';
import { FIREBASE_OPTIONS, AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Config, FLConfig } from 'ng-flamelink/config.service';
import { FLApp, FLContentModule, FLUsersModule } from 'ng-flamelink';
export const FL_CONFIG_TOKEN = new InjectionToken<Config>("initialize()");

@NgModule({
  providers: [
    FLApp
  ],
  imports: [
    AngularFireModule,
    AngularFirestoreModule,
    FLContentModule,
    FLUsersModule
  ]
})
export class FireplaceModule {
  static initialize(options: Config): ModuleWithProviders<FireplaceModule> {

    return {
      ngModule: FireplaceModule,
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: options.firebaseApp },
        { provide: FL_CONFIG_TOKEN, useValue: options },
        { provide: FLConfig, useFactory: flConfigFactory, deps: [FL_CONFIG_TOKEN] },
      ]
    };
  }
}

export function flConfigFactory(options: Config): FLConfig {
  const config = new FLConfig();
  config.set(options)
  return config;
}

