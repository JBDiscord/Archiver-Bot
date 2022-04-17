import { collection } from "firebase/firestore"

export interface IServer {
    blacklist: [],
    botmoderators: [],
    country: String,
    loggingenabled: Boolean,
    loggingchannel: String,
}