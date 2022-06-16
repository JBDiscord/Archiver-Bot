import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, Interaction } from "discord.js";
import { collection, getDocs } from 'firebase/firestore'
import { messagesCol } from "../firebase";
import { ICommand } from "../types";

export const command: ICommand = {
    name: "Archive",
    data: new SlashCommandBuilder()
        .setName("archive")
        .setDescription("Sends the archive of the server as a JSON file!"),
    run: async function (interaction: Interaction, client: Client) {
        if (interaction.isCommand()) {
            const a = collection(messagesCol, interaction.guild.id, 'archive')
            let archive = await getDocs(a)
            let reponse = {archive: []}

            
            archive.forEach((d) => {
                const doc = d.data()
                reponse.archive.push(doc)
            })

            interaction.reply({
                files: [{
                    name: 'archive.json',
                    attachment: Buffer.from(JSON.stringify(reponse))
                }]
            })
        }
    }
}