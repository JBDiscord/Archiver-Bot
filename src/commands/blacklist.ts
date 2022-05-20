import { SlashCommandBuilder } from "@discordjs/builders"
import { Client, Interaction } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore'
import { ICommand } from "../types"

export const command: ICommand = {
    name: "Blacklist",

    data: new SlashCommandBuilder()
        .setName("blacklist")
        .setDescription("Add or remove a channel from the server blacklist")
        .addSubcommand(command =>
            command.setName("add")
            .setDescription("Add a channel to the bots blacklist")
            .addChannelOption(option =>
                option.setName("channel")
                .setDescription("The channel you want to add")
                .addChannelType(0)
                .setRequired(true)))
        .addSubcommand(command =>
            command.setName("remove")
            .setDescription("Remove a channel from the bots blacklist")
            .addChannelOption(option =>
                option.setName("channel")
                .setDescription("The channel you would like to remove")
                .addChannelType(0)
                .setRequired(true))),
                
    run: async function (interaction: Interaction, client: Client) {
        if (interaction.isCommand()) {
            if (interaction.isCommand()) {
                if (interaction.options.getSubcommand() === "add") {
                    try {
                        const serverSettings = doc(serversCol, interaction.guild.id)

                        var updatedoc = await updateDoc(serverSettings, {
                            blackList: arrayUnion(Number(interaction.options.getChannel("channel")))
                        })

                        interaction.reply(`Added ${interaction.options.getChannel("channel")} to blacklist`)
                        return
                    } catch (err) {
                        if (err) console.error(err)
                        interaction.reply("Something went wrong: ErrorCode: CORN 1")
                        return
                    }
                } else if (interaction.options.getSubcommand() === "remove") {
                    try {
                        const serverSettings = doc(serversCol, interaction.guild.id)

                        var updatedoc = await updateDoc(serverSettings, {
                            blackList: arrayRemove(Number(interaction.options.getChannel("channel")))
                        })

                        interaction.reply(`Removed ${interaction.options.getChannel("channel")} from the blacklist`)
                        return
                    } catch(err) {
                        if (err) console.error(err)
                        interaction.reply("Something went wrong: ErrorCode: CORN 2")
                        return
                    }
                }
            }
        }
    }
}