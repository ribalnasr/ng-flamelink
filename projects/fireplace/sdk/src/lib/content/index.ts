import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { FLContent, Document, FLApp, FLSettings } from 'ng-flamelink';
import * as Content from '@flamelink/sdk-content-types';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class Content extends FLContent {

    constructor(
        public firestore: AngularFirestore,
        private auth: AngularFireAuth,
        public flamelink: FLApp,
        zone: NgZone,
        settings: FLSettings,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        super(zone, flamelink, settings, firestore, platformId)
    }

    public async get<T extends Document | Document[] = Document[]>(options: Content.CF.Get | Content.RTDB.Get) {

        return super.get<T>(options).then(
            async result => {
                if (!Array.isArray(result)) {
                    const defaultLocale = (await this.flamelink.settings.get()).defaultLocale.key;
                    const uniqueFields: any[] = await this.flamelink.schemas.getFields({ schemaKey: options.schemaKey }).then(
                        fields => fields
                            .filter(field => field.uniqueAcrossLocales)
                            .map(field => field.key)
                    )
                    const defaultValues = await super.get({ schemaKey: options.schemaKey, entryId: options.entryId, locale: defaultLocale });
                    for (const key in defaultValues) {
                        if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
                            const element = defaultValues[key];
                            if (key! in uniqueFields) {
                                delete defaultValues[key];
                            }
                        }
                    }
                    return {
                        ...defaultValues,
                        ...result
                    }
                }
            }
        );
    }


    public async remove(options: Content.CF.Remove | Content.RTDB.Remove) {

        const uid = (await this.auth.currentUser)?.uid || 'UNKNOWN';
        const doc = await this.get<Document>({ schemaKey: options.schemaKey, entryId: options.entryId });
        await this.update({
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

        return super.remove(options);
    }

}
