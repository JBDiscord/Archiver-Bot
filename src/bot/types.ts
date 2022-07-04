import { ContextMenuCommandBuilder, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"
import { Client, Interaction, PermissionResolvable, ClientEvents } from "discord.js"

export interface IServer {
    loggingEnabled: boolean
    archiveThreads: boolean,
    archiveBots: boolean,
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

// export interface IButton {
//     id: String,
//     perms?: PermissionResolvable,
//     run: (interaction: Interaction, client: Client) => unknown
// }

// From https://github.com/conaticus/boolean/blob/master/src/structures/Bot.ts

export type EventName = keyof ClientEvents;

export type EventListener<T extends EventName> = (
    _client: Client,
    ...args: ClientEvents[T]
) => void;

export interface IBotEvent<T extends EventName> {
    eventName: T;
    once?: boolean;
    run: EventListener<T>;
}

export const TypedEvent = <T extends EventName>(event: IBotEvent<T>) => event;
