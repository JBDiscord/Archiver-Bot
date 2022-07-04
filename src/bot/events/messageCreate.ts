import { Client, Message } from "discord.js";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { messagesCol, serversCol } from "../firebase"
import { TypedEvent } from "../types";

export const event = TypedEvent({
    eventName: "messageCreate",
    once: false,
    run:async (client: Client, message: Message) => {
        if (message.member.id === "979374292259176448") { return; }

        const serverSettings = (await getDoc(doc(serversCol, message.guild.id))).data()

        if (serverSettings.blackList.includes(Number(message.channel.id), 0) == true) { return; }

        if (message.channel.isThread() && serverSettings.archiveThreads === false) { return; }

        const attachments = []
        let isthread
        message.attachments.forEach((value) => {
            attachments.push(value.proxyURL)
        })

        if (message.channel.isThread() == true) {
            isthread = true
        } else {
            isthread = false
        }

        await setDoc(doc(messagesCol, message.guild.id, "archive", message.id), {
            content: message.content,
            user: message.member.id,
            channel: message.channel.id,
            attachments: attachments,
            inThread: isthread
        })
    }
})
