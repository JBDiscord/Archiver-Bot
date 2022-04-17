import { initializeApp } from 'firebase/app'
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore'
import { IServer } from './types/Server'
import config from '../config.json'

export const firebaseApp = initializeApp({
    apiKey: config['firebase_api-key'],
    authDomain: config['firebase_auth-domain'],
    projectId: config['firbase_project-id']
})

export const firestore = getFirestore()

const createCollection =(collectionName: string) => {
    return collection(firestore, collectionName)
}

export const serversCol = createCollection("servers")