import Discord, { PermissionFlags, User} from 'discord.js'
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore'

export const checkIfBotMod = (user: User, guildid: String) => {

}
