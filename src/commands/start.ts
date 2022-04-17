import { SlashCommandBuilder, userMention } from "@discordjs/builders"
import { GuildMember, Interaction, Permissions } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore'

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
        .addChannelType(0)
        .setRequired(false))

export const name = "start"

export default {
    async callback(interation: Interaction) {
        if(interation.isCommand()) {
            const member = interation.member as GuildMember
            
            if (member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                interation.reply(`Initializing Bot, please wait...`)

                var loggingchannel

                if (interation.options.getBoolean("enable_logging") === true) {
                    loggingchannel = Number(interation.options.getChannel("logging_channel"))
                } else {
                    loggingchannel = null
                }

                await setDoc(doc(serversCol, interation.guild.id), {
                    blacklist: [],
                    botmoderators: [],
                    country: interation.options.getString("country"),
                    loggingenabled: interation.options.getBoolean("enable_logging"),
                    loggingchannel: loggingchannel
                })

                setTimeout(() => {
                    interation.editReply(`${userMention(interation.user.id)}, the bot has been initialized! Use /help to see commands!`)
                }, 2000)
            } else {
                interation.reply(`${userMention(interation.user.id)}, you dont have permission to use that command.`)
            }
        }
    }
}