import { ContextMenuCommandBuilder, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"
import { Client, Interaction, PermissionResolvable } from "discord.js"

export interface IServer {
    loggingEnabled: boolean
    archiveThreads: boolean,
    blackList: Number[],
    botModerators: String[],
    country: String,
    loggingChannel: String,
}

export interface IMessage {
    attachments: String[],
    content: String,
    user: String,
    channel: String,
    inThread: boolean
}

export interface ICommand {
    name: String,
    data: SlashCommandBuilder | ContextMenuCommandBuilder | any,
    perms?: PermissionResolvable,
    run: (interaction: Interaction, client: Client) => unknown
}
