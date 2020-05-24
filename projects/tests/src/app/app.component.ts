import { Component } from '@angular/core';
import { FLContent } from 'ng-flamelink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tests';

  // public content = this.flContent.valueChanges({
  //   schemaKey: 'articles'
  // });

  constructor(
    public flContent: FLContent
  ) { }
}
