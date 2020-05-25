import { Component, NgZone } from '@angular/core';
import { FLContent } from 'ng-flamelink';
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
    public zone: NgZone
  ) { }
}
