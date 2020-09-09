import { Injectable } from '@angular/core';
import { switchMap, first, map } from 'rxjs/operators';
import { Document } from './document.interface';
import * as App from '@flamelink/sdk-app-types'
import { FLContent } from './content.service';
export type FLCollectionOptions = App.CF.Options | App.RTDB.Options;

@Injectable({
	providedIn: 'root'
})
export class Single<DocType extends Document> {

	public key: string;
	public defaultOptions: FLCollectionOptions = {}

	constructor(
		public content: FLContent,
	) { }

	public get isBrowser() {
		return this.content.isBrowser;
	}

	public valueChanges(options: FLCollectionOptions = {}) {
		return this.content.valueChanges<DocType>({ schemaKey: this.key, ...this.defaultOptions, ...options })
	}

	public async update(data: DocType, options: FLCollectionOptions = {}) {
		return this.content.valueChanges<DocType>({ schemaKey: this.key }).pipe(
			first()
		).toPromise().then(
			doc => this.content.update({
				...this.defaultOptions,
				...options,
				schemaKey: this.key,
				entryId: doc.id,
				data
			})
		)

	}

}
