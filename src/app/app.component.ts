import { Component, OnInit } from '@angular/core';
import { FLExtend, FLUsers, FLContent } from 'ng-flamelink';

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

    this.content.firestore.collection('fl_content', q => q.where('_fl_meta_.schema', '==', 'history')).valueChanges().subscribe(res => {
      console.log(res);
    })

    this.users.fireAuth.user.subscribe(res => console.log(res));
  }

}
