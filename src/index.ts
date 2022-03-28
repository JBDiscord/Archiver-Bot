import { Client, Guild, Intents } from "discord.js"
import { Embed, bold } from "@discordjs/builders"

import config from "../config.json"
import handler from './command_handler'

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