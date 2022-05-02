import { SlashCommandBuilder, userMention } from "@discordjs/builders"
import { Interaction } from "discord.js"
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, setDoc, arrayRemove } from 'firebase/firestore'

export const data = new SlashCommandBuilder()
    .setName("botmod")
    .setDescription("Add or remove someone from being a bot mod")
    .addSubcommand(command =>
        command.setName("add")
            .setDescription("Make someone a bot mod")
            .addUserOption(option => 
                option.setName("user")
                .setDescription("The person to add")
                .setRequired(true)
            ))
    .addSubcommand(command => 
        command.setName("remove")
        .setDescription("Remove someone as a bot mod")
        .addUserOption(option =>
            option.setName("user")
            .setDescription("The person to remove")
            .setRequired(true)))

export const name = "botmod"

export default {
    async callback(interation: Interaction) {
        if (interation.isCommand()) {
            if(interation.options.getSubcommand() === "add") {
                const member = interation.options.getUser("user")

                await updateDoc(doc(serversCol, interation.guild.id), {
                    botModerators: arrayUnion(Number(member.id))
                })

                interation.reply(`Made ${userMention(member.id)} a bot mod`)

            } else if(interation.options.getSubcommand() === "remove") {
                const member = interation.options.getUser("user")

                await updateDoc(doc(serversCol, interation.guild.id), {
                    botModerators: arrayRemove(Number(member.id))
                })
                
                interation.reply(`Removed ${userMention(member.id)} from being a bot mod`)
            }
        }
    }
}