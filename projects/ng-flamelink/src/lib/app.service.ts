import { Injectable } from '@angular/core';
import flamelink from 'flamelink/app';


@Injectable({
  providedIn: 'root'
})
export class FLApp {

  private app: flamelink.app.App;

  public init(app: flamelink.app.App) {
    this.app = app;
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
