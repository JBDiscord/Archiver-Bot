import { SlashCommandBuilder } from "@discordjs/builders"
import { Client, Interaction } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore'
import { ICommand } from "../types"


export const command: ICommand = {
    name: "Settings",
    data: new SlashCommandBuilder()
        .setName("settings")
        .setDescription("Change the guild settings for the bot")
        .addSubcommand(command =>
            command.setName("archivethreads")
            .setDescription("Weather or not you want the bot to archive messages sent in threads")
            .addBooleanOption(option =>
                option.setName("toggle")
                .setDescription("TODO")
                .setRequired(true))),

    run: async function (interaction: Interaction, client: Client) {
        if (interaction.isCommand()) {
            if (interaction.options.getSubcommand() === "archivethreads") {
                const option = interaction.options.getBoolean("toggle")

                updateDoc(doc(serversCol, interaction.guild.id), {
                    archiveThreads: option
                })

                interaction.reply(`Changed archive threads to: ${String(option)}`)
            }
        }
    }
}