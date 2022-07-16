import { Channel, Client, Guild, Intents, Interaction, Message, TextChannel } from "discord.js"
import { Embed, bold } from "@discordjs/builders"
import { messagesCol, serversCol } from "./firebase"

import config from "../../config.json"
import init from './initalizer'
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"

import { app } from '../api/index'

export const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

client.once("ready", () => {
    init(client)

    console.log("Ready")
})


client.on("guildDelete", (guild: Guild) => {
    try {
        deleteDoc(doc(serversCol, guild.id))
        deleteDoc(doc(messagesCol, guild.id))
    } catch (err) {
        if (err) {
            console.log(`Error in deleting guild from DB. Guild ID: ${guild.id}`)
        }
    }
})


app.listen(5000, () => {
    console.debug("[API] Listening on port 3000")
})
client.login(config.token)
