import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { AppModule } from './app.module';
import { on as applicationOn, launchEvent, suspendEvent, resumeEvent, exitEvent, lowMemoryEvent, uncaughtErrorEvent, ApplicationEventData } from "tns-core-modules/application";
const firebase = require('nativescript-plugin-firebase')

applicationOn(launchEvent, (ards: ApplicationEventData) => {
    if(ards.android) {
        firebase.init()
        .then(()=>console.log(">>>>>Firebase Initialized"))
        .catch(err=>console.log(">>>>>ERROR: Firebase NOT initialized",err))
    }
})

platformNativeScriptDynamic().bootstrapModule(AppModule);
