import { bold, Embed } from "@discordjs/builders";
import { Client, Guild } from "discord.js";
import { TypedEvent } from "../types";

export const event = TypedEvent({
    eventName: "guildCreate",
    once: false,
    run: async (client: Client, guild: Guild) => {
        const guildJoinEmbed = new Embed()
            .setDescription(`Thanks for inviting me!
            Im Archiver Bot a bot the archives the messages sent in you server. 
            To get started please type */start* adnd go through the options!
            
            ${bold("Documentation:")}
            https://www.github.com/tonymoooon543/archiver-bot/wiki/home`)
            
        guild.systemChannel?.send({
            embeds: [guildJoinEmbed]
        })
    }
})