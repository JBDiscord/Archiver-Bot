import { SlashCommandBuilder } from "@discordjs/builders"
import { Interaction } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'

export const data = new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Change the guild settings for the bot")
    
export const name = "settings"

export default {
    async callback(interation: Interaction) {
        if (interation.isCommand()) {
        }
    }
}