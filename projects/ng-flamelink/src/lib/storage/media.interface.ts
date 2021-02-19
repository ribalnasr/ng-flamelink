import { FileObject, ImageSize } from '@flamelink/sdk-storage-types';
import firebase from 'firebase';

export interface MediaMeta {
	createdBy?: string;
	createdDate?: firebase.firestore.Timestamp;
	docId?: string;
}

export interface Media extends FileObject {
	url?: string;
	mediaType?: 'files' | 'images';
	sizes: ImageSize[];
	_fl_meta_?: MediaMeta;
}

