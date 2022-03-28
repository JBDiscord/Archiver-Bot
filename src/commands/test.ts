import { SlashCommandBuilder } from "@discordjs/builders"
import { Interaction } from "discord.js"

export const data = new SlashCommandBuilder()
    .setName("test")
    .setDescription("For the table tennis")
    .addSubcommand(subcommand =>
        subcommand.setName("subtest")
        .setDescription("Things"))
    .addSubcommand(subcommand => 
        subcommand.setName("hello")
        .setDescription("Yes"))
    
export const name = "test"

export default {
    async callback(interation: Interaction) {
        if (interation.isCommand()) {
            if(interation.options.getSubcommand() === "subtest") {
                await interation.reply("This is a test of a subcommand")
            } else if(interation.options.getSubcommand() === "hello") {
                await interation.reply("Hello World!")
            }
        }
    }
}