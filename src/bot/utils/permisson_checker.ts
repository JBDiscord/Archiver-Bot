import Discord, { PermissionFlags, User, Guild } from 'discord.js'
import { client } from "../index"
import { serversCol } from "../firebase"
import { doc, getDoc } from 'firebase/firestore'

export const checkIfBotMod = async (userid: string, guildid: string) => {
    const serverDoc = (await getDoc(doc(serversCol, guildid))).data()

    if(serverDoc.botModerators.includes(userid, 0)) {
        return true
    } else {
        return false
    }
}

export const checkOwnerOfServer = async (userid: string, guildid: string) => {
    const server = client.guilds.cache.get(guildid)

    if(!server) return undefined

    if(server.ownerId == userid) {
        return true
    } else {
        return false
    }
}