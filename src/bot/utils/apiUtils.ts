import { client } from "../index"
import { messagesCol, serversCol } from "../firebase";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IMessage } from "../types";

// Will return 'NOGUILD' if the bot is not in the speifed server
export const getGuildOwnerID = (guildid: string) => {
    if (client.guilds.cache.get(guildid) == undefined) return "NOGUILD"

    return client.guilds.cache.get(guildid).ownerId
}

// Sends back to servers db as JSON
export const getGuildFirestoreDoc = async (guildid: string) => {
    const serverSettings = await (await getDoc(doc(serversCol, guildid))).data()

    if (serverSettings === undefined) {
        return "NOGUILD"
    }

    return {
        "loggingEnabled": serverSettings.loggingEnabled,
        "archiveThreads": serverSettings.archiveThreads,
        "blackList": serverSettings.blackList,
        "botModerators": serverSettings.botModerators,
        "country": serverSettings.country,
        "loggingChannel": serverSettings.loggingChannel
    }
}

export const getGuildMessages =async (guildid: string) => {
    let messages = []
    const serverMessages = (await getDocs(collection(messagesCol, guildid, "archive")))

    if(serverMessages == undefined) {
        return "NOGUILD"
    }

    serverMessages.forEach((result) => {
        let message = result.data() as IMessage

        messages.push({
            "content": message.content,
            "attachments": message.attachments,
            "sendInThread": message.inThread,
            "user": message.user,
            "channel": message.channel
        })
    })

    return messages
}

export const getGuildInfo =async (guildid: string) => {
    const guild = client.guilds.cache.get(guildid)

    if(guild == undefined) {
        return "NOGUILD"
    }

    return {
        "name": guild.name,
        "owner": guild.ownerId,
        "icon": guild.iconURL()
    }
}

export const getUserInfo = async (userid: string) => {
    const guild = client.users.cache.get(userid)

    if (guild == undefined) {
        return "NOUSER"
    }

    return {
        "name": guild.username
    }
}