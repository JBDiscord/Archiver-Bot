import { SlashCommandBuilder } from "@discordjs/builders"
import { Client, Interaction, MessageEmbed } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore'
import { ICommand, IServer } from "../types"
import { settingsCache } from "../utils/cache";

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
                .setRequired(true)))
        .addSubcommand(command => 
            command.setName("archivebots")
            .setDescription("Weather or not you bot messages to be archived")
            .addBooleanOption(option => 
                option.setName("toggle")
                .setDescription("TODO")
                .setRequired(true)))
        .addSubcommand(command => 
            command.setName('view')
            .setDescription("TODO")),

    run: async function (interaction: Interaction, client: Client) {
        if (interaction.isCommand()) {
            if (interaction.options.getSubcommand() === "archivethreads") {
                const option: boolean = interaction.options.getBoolean("toggle")

                updateDoc(doc(serversCol, interaction.guild.id), {
                    archiveThreads: option
                })

                settingsCache[interaction.guild.id].settings.archiveThreads = option

                interaction.reply(`Changed archive threads to: ${String(option)}`)
            }
            if (interaction.options.getSubcommand() === "archivebots") {
                const option = interaction.options.getBoolean("toggle")

                updateDoc(doc(serversCol, interaction.guild.id), {
                    archiveBots: option
                })

                settingsCache[interaction.guild.id].settings.archiveBots = option

                interaction.reply(`Changed archive bots to: ${String(option)}`)
            }
            if(interaction.options.getSubcommand() === "view") {

                var serverSettings: IServer

                if (!settingsCache[interaction.guild.id]) {
                    serverSettings = (await getDoc(doc(serversCol, interaction.guild.id))).data()
                    settingsCache[interaction.guild.id] = {
                        lastCached: Date.now().toString(),
                        settings: serverSettings
                    }
                    console.log("Grabbing from DB")
                } else {
                    serverSettings = settingsCache[interaction.guild.id].settings
                    console.log("Grabbing from cache")
                }

                const embed = new MessageEmbed()
                    .setDescription(`
                    Archive Bot: ${serverSettings.archiveBots}
                    Archive Thread: ${serverSettings.archiveThreads}
                    Logging Enabled: ${serverSettings.loggingEnabled}
                    `)

                interaction.reply({
                    embeds: [embed]
                })
            }
        }
    }
}