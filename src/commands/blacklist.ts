import { SlashCommandBuilder } from "@discordjs/builders"
import { Interaction } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore'

export const data = new SlashCommandBuilder()
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
            .setRequired(true)))

export const name = "blacklist"

export default {
    async callback(interation: Interaction) {
        if (interation.isCommand()) {
            if (interation.options.getSubcommand() === "add") {
                try {
                    const serverSettings = doc(serversCol, interation.guild.id)

                    var updatedoc = await updateDoc(serverSettings, {
                        blackList: arrayUnion(Number(interation.options.getChannel("channel")))
                    })

                    interation.reply(`Added ${interation.options.getChannel("channel")} to blacklist`)
                    return
                } catch (err) {
                    if (err) console.error(err)
                    interation.reply("Something went wrong: ErrorCode: CORN 1")
                    return
                }
            } else if (interation.options.getSubcommand() === "remove") {
                try {
                    const serverSettings = doc(serversCol, interation.guild.id)

                    var updatedoc = await updateDoc(serverSettings, {
                        blackList: arrayRemove(Number(interation.options.getChannel("channel")))
                    })

                    interation.reply(`Removed ${interation.options.getChannel("channel")} from the blacklist`)
                    return
                } catch(err) {
                    if (err) console.error(err)
                    interation.reply("Something went wrong: ErrorCode: CORN 2")
                    return
                }
            }
        }
    }
    
}