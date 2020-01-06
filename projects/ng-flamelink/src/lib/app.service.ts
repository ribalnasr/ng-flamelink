import { Injectable } from '@angular/core';
import * as _flamelink from 'flamelink/app';
import { FLConfig } from './config.service';
import { AngularFirestore } from '@angular/fire/firestore';

const flamelink = _flamelink && _flamelink['default'] || _flamelink;

@Injectable({
  providedIn: 'root'
})
export class FLApp {

  private app: flamelink.app.App;

  constructor(
    private config: FLConfig,
    private firestore: AngularFirestore
  ) {
    this.app = flamelink({
      ...this.config.get(),
      firebaseApp: this.firestore.firestore.app,
    });
  }

  public get content() {
    return this.app.content;

  }

  public get storage() {
    return this.app.storage;
  }

  public get nav() {
    return this.app.nav;
  }

  public get schemas() {
    return this.app.schemas;
  }

  public get settings() {
    return this.app.settings;
  }

  public get users() {
    return this.app.users;
  }

}
