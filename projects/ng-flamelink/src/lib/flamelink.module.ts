import { NgModule, ModuleWithProviders } from '@angular/core';
import { FirebaseOptions, FirebaseOptionsToken } from '@angular/fire';
import { FLApp } from './app.service';
import flamelink from 'flamelink/app';
import firebase from 'firebase/app';
import { FLExtend } from './extend.service';
import 'firebase/firestore';

@NgModule({
  providers: [
    FLExtend
  ]
})
export class FlamelinkModule {
  static forRoot(options: FLConfig): ModuleWithProviders {
    return {
      ngModule: FlamelinkModule,
      providers: [
        { provide: FirebaseOptionsToken, useValue: options.firebaseApp },
        { provide: FLApp, useFactory: FLAppFactory(options) }
      ]
    };
  }
}

const FLAppFactory = (config: FLConfig) => () => {
  const service = new FLApp();
  service.init(flamelink({
    ...config,
    firebaseApp: firebase.initializeApp(config.firebaseApp),
  }));
  return service;
};


export interface FLConfig extends flamelink.app.Config {
  firebaseApp: FirebaseOptions;
  env?: string;
  locale?: string;
  dbType?: 'rtdb' | 'cf';
  precache?: boolean | { schemas?: string[] };
}
