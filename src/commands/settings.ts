import { SlashCommandBuilder } from "@discordjs/builders"
import { Interaction } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore'

export const data = new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Change the guild settings for the bot")
    .addSubcommand(command =>
        command.setName("archivethreads")
        .setDescription("Weather or not you want the bot to archive messages sent in threads")
        .addBooleanOption(option =>
            option.setName("toggle")
            .setDescription("TODO")
            .setRequired(true)))
    
export const name = "settings"

export default {
    async callback(interation: Interaction) {
        if (interation.isCommand()) {
            if (interation.options.getSubcommand() === "archivethreads") {
                const option = interation.options.getBoolean("toggle")

                updateDoc(doc(serversCol, interation.guild.id), {
                    archiveThreads: option
                })

                interation.reply(`Changed archive threads to: ${String(option)}`)
            }
        }
    }
}