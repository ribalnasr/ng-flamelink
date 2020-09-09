import { Component } from '@angular/core';
import { FLContent, FLUsers, Document } from 'ng-flamelink';
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
    private flContent: FLContent,
    private flUsers: FLUsers
  ) { }

  public delete(entryId: string) {
    this.flContent.remove({
      schemaKey: 'articles',
      entryId
    })
  }

  ngOnInit() {
    // setTimeout(() => {

    //   this.flContent.add({
    //     schemaKey: 'articles',
    //     // entryId: 'pMomb04s7dxhXeGU0zhP',
    //     data: {
    //       content: 'middleware test2'
    //     }
    //   })
    // }, 4000)


    this.flContent.middlewares = {
      beforeRead: (options) => {
        console.log('started reading', options);
      },
      beforeUpdate: (options) => {
        console.log('started updating meta...', options);
      },
      afterUpdate: (options) => {
        console.log('finished updating meta...', options);
      },
      beforeDelete: async (options) => {
        console.log('started deleting id:' + options.entryId + '...');
        const uid = (await this.flUsers.auth.currentUser)?.uid || 'UNKNOWN';
        const doc = await this.flContent.get<Document>({ schemaKey: options.schemaKey, entryId: options.entryId });
        await this.flContent.update({
          entryId: options.entryId,
          schemaKey: options.schemaKey,
          data: {
            _fl_meta_: {
              ...doc._fl_meta_,
              deletedBy: uid,
              deletedDate: new Date()
            }
          }
        })
        console.log('deleting now...');
      },
      afterDelete: (options) => {
        console.log('finished deleting id:' + options.entryId + '...');
      }
    }

  }
}
