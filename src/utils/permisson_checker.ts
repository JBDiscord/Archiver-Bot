import Discord, { PermissionFlags, User} from 'discord.js'
import { firestore, serversCol } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore'

export const checkIfBotMod = async (user: User, guildid: string) => {
    const serverDoc = (await getDoc(doc(serversCol, guildid))).data()

}
