import { ContextMenuCommandBuilder, Embed, SlashCommandBuilder } from "@discordjs/builders"
import { Interaction } from "discord.js"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { messagesCol, serversCol } from "../firebase"

export const data = new ContextMenuCommandBuilder()
    .setName("Archive Message")
    .setType(3)

export const name = "Archive Message"

export default {
    async callback(interation: Interaction) {
        if (interation.isMessageContextMenu()) {
            const message = interation.targetMessage
            
            const attachments = []
            let isthread
            message.attachments.forEach((value) => {
                attachments.push(value.proxyURL)
            })

            if (interation.channel.isThread() == true) {
                isthread = true
            } else {
                isthread = false
            }

            await setDoc(doc(messagesCol, interation.guild.id, "archive", message.id), {
                content: message.content,
                user: message.member.user.id,
                attachments: attachments,
                inThread: isthread
            })    

            interation.reply({content: "Archived Message", ephemeral: true})
        }
    }
}