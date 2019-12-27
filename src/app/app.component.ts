import { Component, OnInit } from '@angular/core';
import { FLExtend } from 'ng-flamelink';
import { FLContent } from 'ng-flamelink/content';
import { FLUsers } from 'ng-flamelink/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private content: FLContent,
    private users: FLUsers,
    private extend: FLExtend
  ) { }

  ngOnInit() {

    this.extend.onLog.subscribe(log => {
      console.log(log);
    })

    this.users.fireAuth.user.subscribe(res => console.log(res));
  }

}
