import { initializeApp, getApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore'

import {
  getAuth,
  signInWithCustomToken as fbSignInWithCustomToken,
  updateProfile as fbUpdateProfile,
  signOut as fbSignOut,
} from 'firebase/auth'

class Firebase {
  constructor(firebaseKeys) {
    // Do not initialize the app if this step was already done.
    if (firebase.apps.length) {
      this.app = getApp()
    } else if (firebaseKeys.apiKey) {
      this.app = initializeApp(firebaseKeys)
    }
    this.auth = getAuth(this.app)
    this.firestore = getFirestore(this.app)
    console.log(this.app)
  }

  signInWithCustomToken = (token) => fbSignInWithCustomToken(this.auth, token)

  updateProfile = (data) => fbUpdateProfile(this.auth.currentUser, data)

  getDocument = async ({ collectionName, id }) => {
    const docRef = doc(this.firestore, collectionName, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return null
  }

  createDocument = (data, { collectionName, id }) => {
    const payloadWithTimestamp = {
      ...data,
      createdAt: serverTimestamp(),
    }
    // if id is not provided, random id is generated
    return id
      ? setDoc(doc(this.firestore, collectionName, id), payloadWithTimestamp)
      : addDoc(collection(this.firestore, collectionName), payloadWithTimestamp)
  }

  updateDocument = async (data, { id, collectionName }) => {
    try {
      const payloadWithTimestamp = {
        ...data,
        updatedAt: serverTimestamp(),
      }
      const ref = doc(this.firestore, collectionName, id)
      return updateDoc(ref, payloadWithTimestamp)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  deleteDocument = async ({ collectionName, id }) => {
    try {
      const ref = doc(this.firestore, collectionName, id)
      return deleteDoc(ref)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  getDocuments = async ({
    collectionName,
    returnOnlyFirst,
    withDocumentId = true,
    dataNormalizer,
    filters,
  }) => {
    try {
      const queryFilterArray = filters.map((filter) =>
        where(filter.key, filter.operator, filter.value)
      )
      const queryFilter = query(
        collection(this.firestore, collectionName),
        ...queryFilterArray
      )
      const querySnapshot = await getDocs(queryFilter)
      const result = querySnapshot.docs.map((document) => {
        const data = {
          ...document.data(),
          ...(withDocumentId && {
            id: document.id,
          }),
        }
        if (dataNormalizer) {
          return dataNormalizer(data)
        }
        return data
      })
      return returnOnlyFirst ? result?.[0] : result
    } catch (err) {
      return null
    }
  }

  onCollectionChange = async ({
    collectionName,
    withDocumentId = true,
    dataNormalizer,
    filters,
    onChangeCallback = () => {},
  }) => {
    try {
      const queryFilterArray = filters.map((filter) =>
        where(filter.key, filter.operator, filter.value)
      )
      const queryFilter = query(
        collection(this.firestore, collectionName),
        ...queryFilterArray
      )
      const unsubcribe = onSnapshot(queryFilter, (querySnapshot) => {
        const result = querySnapshot.docs.map((document) => {
          const data = {
            ...document.data(),
            ...(withDocumentId && {
              id: document.id,
            }),
          }
          if (dataNormalizer) {
            return dataNormalizer(data)
          }
          return data
        })
        onChangeCallback(result)
      })
      return unsubcribe
    } catch (err) {
      return null
    }
  }

  signOut = () => fbSignOut(this.auth)
}

export default Firebase
