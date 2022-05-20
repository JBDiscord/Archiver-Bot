import { MessageEmbed } from "discord.js";

export const noPermsEmbed = new MessageEmbed()
    .setTitle("Command Failed")
    .setColor("RED")
    .setDescription("You do not have the permissions to run this command")

export const commandErrorEmbed = new MessageEmbed()
    .setTitle("Command Failed")
    .setColor("RED")
    .setDescription("Somehthing went wrong while running the command!")