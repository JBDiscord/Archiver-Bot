import { client } from "../index"
import { serversCol } from "../firebase";

import { doc, getDoc } from "firebase/firestore";

// Will return 'NOGUILD' if the bot is not in the speifed server
export const getGuildOwnerID = (guildid: string) => {
    if (client.guilds.cache.get(guildid) == undefined) return "NOGUILD"

    return client.guilds.cache.get(guildid).ownerId
}

// Sends back to servers db as JSON
export const getGuildFirestoreDoc = async (guildid: string) => {
    const serverSettings = await (await getDoc(doc(serversCol, guildid))).data()

    return {
        "loggingEnabled": serverSettings.loggingEnabled,
        "archiveThreads": serverSettings.archiveThreads,
        "blackList": serverSettings.blackList,
        "botModerators": serverSettings.botModerators,
        "country": serverSettings.country,
        "loggingChannel": serverSettings.loggingChannel
    }
}