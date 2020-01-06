import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { FirebaseOptionsToken, AngularFireModule } from '@angular/fire';
import { FLApp } from './app.service';
import { FLExtend } from './extend.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FLConfig, Config } from './config.service';
export const FL_CONFIG_TOKEN = new InjectionToken<Config>("forRoot() MyService configuration.");

@NgModule({
  providers: [
    FLExtend,
    FLApp
  ],
  imports: [
    AngularFireModule,
    AngularFirestoreModule
  ]
})
export class FlamelinkModule {
  static initialize(options: Config): ModuleWithProviders {

    return {
      ngModule: FlamelinkModule,
      providers: [
        { provide: FirebaseOptionsToken, useValue: options.firebaseApp },
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

