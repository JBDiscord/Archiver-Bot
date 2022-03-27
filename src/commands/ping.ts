import { SlashCommandBuilder } from "@discordjs/builders"

export const data = new SlashCommandBuilder()
.setName("ping")
.setDescription("Table Tennis 🏓")
.addStringOption(option =>
    option.setName('country')
        .setDescription('Please select your country')
        .setRequired(true)
        .addChoice('United States', 'usa')
        .addChoice('United Kingdom', 'uk')
        .addChoice('Russia', 'ru'));