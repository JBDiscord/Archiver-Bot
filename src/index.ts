import { Client, Guild, Intents, Message } from "discord.js"
import { Embed, bold } from "@discordjs/builders"
import { serversCol } from "./firebase"

import config from "../config.json"
import handler from './command_handler'
import { doc, getDoc, setDoc } from "firebase/firestore"

const client = new Client({
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
    if (message.member.id === "912903685892345906"){ return; }

    const serverSettings = (await getDoc(doc(serversCol, message.guild.id))).data()
    if (message.guild.id in serverSettings.blacklist) { return; }

    const attachments = Array(message.attachments)

    attachments.forEach((i) => {
        console.log(i[0].url)
    });

    await setDoc(doc(serversCol, message.guild.id, "archive", message.id), {
        content: message.content,
        user: message.member.id
    })    
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

client.login(config.token)