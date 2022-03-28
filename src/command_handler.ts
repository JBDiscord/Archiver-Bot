// Discord imports
import Discord, { Client, Guild, Interaction} from "discord.js"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"

import getfiles from './getfiles'
import config from "../config.json"


export default (client: Client) => {
    const rest = new REST({ version: '9' }).setToken(config.token);
    
    const commands = {} as {
        [key: string]: any
    }

    const commandsBody = []
    const commandFiles = getfiles("C:\\Users\\wayne\\Desktop\\Jakob2\\JB Programs\\Archiver Bot\\src\\commands")

    for(const file of commandFiles)
    {
        const command = require(`${file}`)
        commandsBody.push(command.data.toJSON())

        commands[command.name.toLowerCase()] = command.default
    }

    if (config.debug === true) {
        (async () => {
            try {
                console.log('Started refreshing guild (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(config.client_id, config.debug_guild),
                    { body: commandsBody },
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
                    { body: commandsBody },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }

    client.on("interactionCreate", async (interaction: Interaction) =>{
        if(!interaction.isCommand()) {
            return
        }

        const { commandName } = interaction
        
        try {
            commands[commandName].callback(interaction)
        } catch(err) {
            if(err) console.error(err)
        }
    })
}