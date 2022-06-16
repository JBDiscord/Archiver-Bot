import { SlashCommandBuilder, userMention } from "@discordjs/builders"
import { Client, GuildMember, Interaction, Permissions } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, setDoc, collection } from 'firebase/firestore'
import { ICommand } from "../types"


export const command: ICommand = {
    name: "Start",
    data: new SlashCommandBuilder()
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
                .addChannelType(0)
                .setRequired(false)),
    run: async function (interaction: Interaction, client: Client) {
        if (interaction.isCommand()) {
            const member = interaction.member as GuildMember

            if (member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                interaction.reply(`Initializing Bot, please wait...`)

                var loggingchannel

                if (interaction.options.getBoolean("enable_logging") === true) {
                    loggingchannel = Number(interaction.options.getChannel("logging_channel"))
                } else {
                    loggingchannel = null
                }

                await setDoc(doc(serversCol, interaction.guild.id), {
                    blackList: [],
                    botModerators: [],
                    archiveThreads: null,
                    country: interaction.options.getString("country"),
                    loggingEnabled: interaction.options.getBoolean("enable_logging"),
                    loggingChannel: loggingchannel
                })

                await setDoc(doc(collection(firestore, "messages"), interaction.guild.id), {
                   "archiveVersion": 1
                })

                setTimeout(() => {
                    interaction.editReply(`${userMention(interaction.user.id)}, the bot has been initialized! Use /help to see commands!`)
                }, 2000)
            } else {
                interaction.reply(`${userMention(interaction.user.id)}, you dont have permission to use that command.`)
            }
        }
    }
}