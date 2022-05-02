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
    const commandFiles = getfiles(config.command_dir)

    for(const file of commandFiles)
    {
        const command = require(`${file}`)
        commandsBody.push(command.data.toJSON())

        console.log(`Loaded ${command.name}`)

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
        if(interaction.isCommand()) {
            const { commandName } = interaction
            const commandName1: String = commandName

            try {
                commands[commandName1.toLowerCase()].callback(interaction)
            } catch (err) {
                if (err) console.error(err)
            }
        }

        if(interaction.isMessageContextMenu()) {
            const { commandName } = interaction
            const commandName1: String = commandName

            try {
                commands[commandName1.toLowerCase()].callback(interaction)
            } catch (err) {
                if (err) console.error(err)
            }
        }
    })
}