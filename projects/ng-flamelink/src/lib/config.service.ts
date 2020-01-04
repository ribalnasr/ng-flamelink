import { Injectable } from '@angular/core';
import { FirebaseOptions } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class FLConfig {

  private _config: Config;

  public get() {
    return this._config;
  }

  public set(config: Config) {
    this._config = config;
  }

}


export interface Config extends flamelink.app.Config {
  firebaseApp: FirebaseOptions;
}
