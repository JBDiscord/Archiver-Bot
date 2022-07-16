import { IServer } from "../types"

export const settingsCache = {} as {
    [id: string]: {
        lastCached: string,
        settings: IServer
    }
}