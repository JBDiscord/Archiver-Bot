import { Channel, Client, Guild, Intents, Message, TextChannel } from "discord.js"
import { Embed, bold } from "@discordjs/builders"
import { messagesCol, serversCol } from "./firebase"

import config from "../../config.json"
import handler from './command_handler'
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
    handler(client)

    console.log("Ready")
})

client.on("messageCreate", async (message: Message)=> {
    if (message.member.id === "979374292259176448"){ return; }

    const serverSettings = (await getDoc(doc(serversCol, message.guild.id))).data()

    if (serverSettings.blackList.includes(Number(message.channel.id), 0) == true) { return; }
    
    if (message.channel.isThread() && serverSettings.archiveThreads === false) { return; }

    const attachments = []
    let isthread
    message.attachments.forEach((value) => {
        attachments.push(value.proxyURL)
    })

    if (message.channel.isThread() == true) {
        isthread = true
    } else {
        isthread = false
    }

    await setDoc(doc(messagesCol, message.guild.id, "archive", message.id), {
        content: message.content,
        user: message.member.id,
        channel: message.channel.id,
        attachments: attachments,
        inThread: isthread
    })    
})

client.on("guildDelete", (guild: Guild) => {
    try {
        deleteDoc(doc(serversCol, guild.id))
        deleteDoc(doc(messagesCol, guild.id))
    } catch(err) {
        if(err) {
            console.log(`Error in deleting guild from DB. Guild ID: ${guild.id}`)
        }
    }
})

client.on("guildCreate", (guild: Guild) => {
    const guildJoinEmbed = new Embed()
        .setDescription(`Thanks for inviting me!
   Im Archiver Bot a bot the archives the messages sent in you server. 
   To get started please type */start* adnd go through the options!
   
   ${bold("Documentation:")}
   https://www.github.com/tonymoooon543/archiver-bot/wiki/home`)


    guild.systemChannel?.send({
        embeds: [guildJoinEmbed]
    })
})

app.listen(5000, () => {
    console.debug("[API] Listening on port 3000")
})
client.login(config.token)
