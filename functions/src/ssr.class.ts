import * as functions from "firebase-functions";

export class ssr {
    constructor(private app: string) { }

    public get httpsFunction() {
        const universal = require(`./ssr/${this.app}/server/main.js`).app();
        return functions.https.onRequest(universal);
    }
}
