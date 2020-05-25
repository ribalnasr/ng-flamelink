# AngularFlamelink

Angular wrapper modules for Flamelink SDK.

## Installation

Run `npm i -s firebase flamelink@next @angular/fire ng-flamelink`. 

Then, import FlamelinkModule in your app.module.ts:

```
...
import { FlamelinkModule, FLContentModule, FLStorageModule } from 'ng-flamelink';
...

@NgModule({
	imports: [
		FlamelinkModule.initialize(
			{
				dbType: 'cf', // Cloud Firestore or 'rtdb' for Real-Time Database
				firebaseApp: {
					apiKey: 'YOUR_API_KEY_FROM_FIREBASE',
					authDomain: '...',
					databaseURL: '...',
					projectId: '...',
					storageBucket: '...',
					messagingSenderId: '...'
				}
			}
		),
		FLContentModule,
		FLStorageModule,
		
		// Import other services you're using...
		// FLSchemasModule,
		// FLUsersModule,
		// FLSettingsModule,
		// FLNavigationModule,
		// ...
	]
})

```

## Usage

**app.component.ts**
```
...
import { FLContent } from 'ng-flamelink';
...

@Component({
	// ...
})
export class AppComponent {

	public projects = this.content.valueChanges({
		schemaKey: 'projects',
		filters: [['category', '==', 'web']]
		// ... other settings
	});

	constructor(
		private content: FLContent
	) { }

}
```

**app.component.html**
```
<div *ngFor="let project of projects | async">
	{{ project.title }}
</div>
```

## Api

Angular Flamelink extends the same api used in Flamelink SDK with few differences mentioned below:

### FLContent

Extends native functionalities listed under Flamelink official docs: https://flamelink.github.io/flamelink-js-sdk/#/content.


##### Extended Properties and Methods:

**FLContent.valueChanges(settings)**

The native .subscribe() is replace by .valueChanges(). Both take the same settings except that .valueChanges() does not expect the callback property, instead it returns an Observable of the result to which you can subscribe.

Example:
```
	constructor(
		private content: FLContent
	) { 
		this.content.valueChanges({
			schemaKey: 'projects'
		}).subscribe((data) => {
			console.log(data);
		});
	}
```

**FLContent.valueChangesRaw(settings)**

Similarly to .valueChanges() explained above, .valueChangesRaw() replaces the native .subscribeRaw() retuning an Observable of the raw result.


**FLContent.ref(id)**

returns a Firestore DocumentReference. 

##### Note:

If needed, The AngularFirestore service could be accessed from within the FLContent service as below:
```
	constructor(
		private content: FLContent
	) { 
		const contentCollection = this.content.firestore.collection('fl_content');
	}
```


### FLUsers

Extends native functionalities listed under Flamelink official docs: https://flamelink.github.io/flamelink-js-sdk/#/users

##### Extended Properties and Methods:

**FLUsers.valueChanges(settings)**

The native .subscribe() is replace by .valueChanges(). Both take the same settings except that .valueChanges() does not expect the callback property, instead it returns an Observable of the result to which you can subscribe.

Example:
```
this.users.valueChanges().subscribe((data) => {
	console.log(data);
});
```

**FLUsers.valueChangesRaw(settings)**

Similarly to .valueChanges() explained above, .valueChangesRaw() replaces the native .subscribeRaw() retuning an Observable of the raw result.


**FLUsers.ref(uid)**

returns a Firestore DocumentReference for the user. 

##### Note:

If needed, The AngularFireAuth service could be accessed from within the FLUsers service as below:
```
	constructor(
		private users: FLUsers
	) { 
		this.users.fireAuth.auth.signInWithEmailAndPassword('name@email.com', 'password');
	}
```

### FLStorage
Extends native functionalities listed under Flamelink official docs: https://flamelink.github.io/flamelink-js-sdk/#/storage

### FLSettings
Extends native functionalities listed under Flamelink official docs: https://flamelink.github.io/flamelink-js-sdk/#/settings

### FLNavigation
Extends native functionalities listed under Flamelink official docs: https://flamelink.github.io/flamelink-js-sdk/#/navigation

### FLSchemas
Extends native functionalities listed under Flamelink official docs: https://flamelink.github.io/flamelink-js-sdk/#/schemas

