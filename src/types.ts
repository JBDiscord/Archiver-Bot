export interface IServer {
    loggingEnabled: boolean
    archiveThreads: boolean,
    blackList: String[],
    botModerators: String[],
    country: String,
    loggingChannel: String,
}

export interface IMessage {
    attachments: String[],
    content: String,
    user: String,
    inThread: boolean
}