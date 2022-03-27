import { Client, Guild, Intents, Interaction } from "discord.js"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { readdirSync } from "fs"
import config from "../config.json"
import getFiles from "./getfiles"
import { Embed, bold } from "@discordjs/builders"
// REGION: Variables
const commands = []
const commandfiles = getFiles("C:\\Users\\wayne\\Desktop\\Jakob2\\JB Programs\\Archiver Bot\\src\\commands")
const rest = new REST({ version: '9' }).setToken(config.token);
// ENDREGION: Variables

// REGION: First functions
for(const file of commandfiles)
{
    const command = require(`${file}`)
    commands.push(command.data.toJSON())
}

if (config.debug === true)
{
    (async () => {
        try {
            console.log('Started refreshing guild (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(config.client_id, config.debug_guild),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
} else {
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(config.client_id),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}

//ENDREGION: First functions

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

client.once("ready", ()=>{
    console.log("Ready")
})

client.on("interactionCreate", async (interation: Interaction)=> {
    if(!interation.isCommand()) return;

    if(interation.commandName === 'ping') {
        await interation.reply({
            content: "Pong!"
        })
        console.log(interation.options.getString('country'))
    }
})

client.on("guildCreate", (guild: Guild)=>{
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