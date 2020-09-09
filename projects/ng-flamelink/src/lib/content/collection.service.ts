import { Injectable } from '@angular/core';
import { switchMap, first, map } from 'rxjs/operators';
import { Document } from './document.interface';
import { CF } from '@flamelink/sdk-content-types';
import { FLContent } from './content.service';

@Injectable({
	providedIn: 'root'
})
export class Collection<DocType extends Document> {

	public key: string;
	public defaultOptions: CF.Get = {
		orderBy: {
			field: 'order',
			order: 'desc'
		},

	}

	constructor(
		public content: FLContent,
	) { }

	public get isBrowser() {
		return this.content.isBrowser;
	}

	public ref(id: string) {
		return this.content.ref(id);
	}

	public valueChanges<T extends (DocType[] | DocType) = DocType[]>(options: CF.Get = {}) {
		return this.content.valueChanges<T>({ schemaKey: this.key, ...this.defaultOptions, ...options })
	}

	public async add(data: DocType, options: CF.Get = {}) {

		const lastDocument = await this.content.valueChanges<DocType[]>({
			schemaKey: this.key,
			orderBy: {
				field: 'order',
				order: 'desc',
			},
			limit: 1
		}).pipe(
			first(),
			map(results => results && results[0])
		).toPromise();

		const order = lastDocument && lastDocument.order && (Number(lastDocument.order) + 1) || 1;
		return this.content.add<DocType>({
			...this.defaultOptions,
			...options,
			schemaKey: this.key,
			data: { ...data, order }
		});
	}

	public async update(id: string, data: DocType, options: CF.Get = {}) {
		return this.content.update({
			...this.defaultOptions,
			...options,
			schemaKey: this.key,
			entryId: id,
			data
		})
	}

	public async remove(id: string, options: CF.Get = {}) {
		return this.content.remove({
			...this.defaultOptions,
			...options,
			schemaKey: this.key,
			entryId: id
		})
	}


}
