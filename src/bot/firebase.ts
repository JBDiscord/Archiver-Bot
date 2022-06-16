import { initializeApp } from 'firebase/app'
import { collection, CollectionReference, DocumentData, DocumentReference, getFirestore } from 'firebase/firestore'
import config from "../../config.json"
import { IMessage, IServer } from './types'

export const firebaseApp = initializeApp({
    apiKey: config['firebase_api-key'],
    authDomain: config['firebase_auth-domain'],
    projectId: config['firbase_project-id']
})

export const firestore = getFirestore()

const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(firestore, collectionName) as CollectionReference<T>
}

export const serversCol = createCollection<IServer>("servers")
export const messagesCol = createCollection<IMessage>("messages")