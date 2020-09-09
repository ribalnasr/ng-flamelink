import { Injectable } from '@angular/core';
import { Document } from './document.interface';
import { Collection } from './collection.service';

@Injectable({
	providedIn: 'root'
})
export class Form<DocType extends Document> extends Collection<DocType> {


}
