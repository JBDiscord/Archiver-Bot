import { SlashCommandBuilder } from "@discordjs/builders"
import { Interaction } from "discord.js"

export const data = new SlashCommandBuilder()
    .setName("start")
    .setDescription("To initialize Archiver Bot")
    .addStringOption(option =>
        option.setName('country')
            .setDescription('Please select your country')
            .setRequired(true)
            .addChoice('United States', 'usa')
            .addChoice('United Kingdom', 'uk')
            .addChoice('Europen Union', 'eu')
            .addChoice('Canada', 'ca')
            .addChoice('Mexico', 'mex')
            .addChoice('Russia', 'ru'))
    .addBooleanOption(option => 
        option.setName('enable_logging')
        .setDescription('If you would like the bot to notify you about things')
        .setRequired(true))
    .addChannelOption(option => 
        option.setName("logging_channel")
        .setDescription("The logging channel, make sure its text")
        .setRequired(false))

export const name = "start"

export default {
    async callback(interation: Interaction) {
        if(interation.isCommand()) {
            interation.reply(`Initializing Bot, please wait...`)
            setTimeout(() => {
                interation.editReply(`Bot initialized! use /help to see commands!`)
            }, 3000)
        }
    }
}