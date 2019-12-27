import { Component, OnInit } from '@angular/core';
import { FLContent, FLExtend } from 'ng-flamelink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private content: FLContent,
    private extend: FLExtend
  ) { }

  ngOnInit() {

    this.extend.onLog.subscribe(log => {
      console.log(log);
    })

    this.content.get({ schemaKey: 'ideas' }).then((res) => console.log(res));

  }

}
