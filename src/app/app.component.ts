import { Component, OnInit } from '@angular/core';
import { FLUsers, FLContent } from 'ng-flamelink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private content: FLContent,
    private users: FLUsers,
    // private extend: FLExtend
  ) { }

  ngOnInit() {
    this.content.valueChanges({ schemaKey: 'ideas' }).subscribe(res => console.log(res));
    this.users.fireAuth.user.subscribe(res => console.log(res));
  }

}
