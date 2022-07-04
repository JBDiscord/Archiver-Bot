import { Client, Interaction } from "discord.js";
import { ICommand, TypedEvent } from "../types";

import { commands } from '../initalizer'
import { commandErrorEmbed, noPermsEmbed } from "../utils/embeds";

export const event = TypedEvent({
    eventName: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.isCommand()) {
            if (!interaction.inCachedGuild()) return;

            const { commandName } = interaction
            const command = commands[commandName.toLowerCase()] as ICommand
            if (!command) return;

            //Permissions Checker
            if (command.perms && !interaction.member.permissions.has(command.perms)) {
                interaction.reply({ embeds: [noPermsEmbed], ephemeral: true })
            }

            try {
                await command.run(interaction, client)
            } catch (err) {
                if (interaction.deferred || interaction.replied) {
                    await interaction.editReply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                    });
                } else {
                    await interaction.reply({
                        content: " ",
                        embeds: [commandErrorEmbed],
                        ephemeral: true,
                    });
                }

                console.log(err)
            }
        }
        // For future uses, maybe
        if(interaction.isButton()) {
            interaction.reply("Hello!")
        }
    }
})