import { Component, NgZone } from '@angular/core';
import { FLContent, FLSettings } from 'ng-flamelink';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tests';

  public content = this.flContent.valueChanges({ schemaKey: 'articles' }).pipe(
    tap(
      res => console.log(res)
    )
  );
  constructor(
    public flContent: FLContent,
    public flSettings: FLSettings,
    public zone: NgZone
  ) { }

  ngOnInit() {

    this.flContent.middlewares = {
      afterRead: async () => {
        console.log('afterRead middleware');
      }
    }

    setTimeout(() => {
      console.log(2)
      this.flSettings.setLocale('ar')
    }, 1000)
  }
}
