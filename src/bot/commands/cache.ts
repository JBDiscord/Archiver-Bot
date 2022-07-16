import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, Interaction } from "discord.js";
import { ICommand } from "../types";
import { settingsCache } from "../utils/cache";
import { messagesCol, serversCol } from "../firebase"
import { getDoc, doc, setDoc } from "firebase/firestore";


export const command: ICommand = {
    name: "Cache",
    data: new SlashCommandBuilder()
        .setName("cache")
        .setDescription("TODO"),
    run: async function (interaction: Interaction, client: Client) {
        if (interaction.isCommand()) {
            const serverSettings = (await getDoc(doc(serversCol, interaction.guild.id))).data()

            settingsCache[interaction.guild.id] = {
                lastCached: Date.now().toString(),
                settings: serverSettings
            }

            interaction.reply('done!')
        }
    }
}