import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

import type { FirebaseOptions } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore, CollectionReference } from 'firebase/firestore'
import type { Analytics } from 'firebase/analytics'

// Firebase configuration options type
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDaCfxM7eOjN4BOtH5eshfcpfla7qhkgUY',
  authDomain: 'starfield-resource-tracker.firebaseapp.com',
  projectId: 'starfield-resource-tracker',
  storageBucket: 'starfield-resource-tracker.appspot.com',
  messagingSenderId: '621043212042',
  appId: '1:621043212042:web:7efa76481397cb55d9e4f3',
  measurementId: 'G-R405TX4NP8'
}

const firebaseApp = initializeApp(firebaseConfig)

const auth: Auth = getAuth(firebaseApp)
const db: Firestore = getFirestore(firebaseApp)
const analytics: Analytics = getAnalytics(firebaseApp)

// const modsRef: CollectionReference = collection(db, 'modifications')
// const shoppingListRef: CollectionReference = collection(db, 'shopping')

export { firebaseApp, auth, db, analytics }
