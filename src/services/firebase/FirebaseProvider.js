import { createContext, useContext, useRef } from 'react'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import Firebase from './Firebase'

const FirebaseContext = createContext()
export default function FirebaseProvider({ children, config }) {
  const firebaseInstance = useRef(new Firebase(config)).current

  const getDocuments = ({ filters = [], ...rest }) =>
    firebaseInstance.getDocuments({
      filters,
      ...rest,
    })
  const onCollectionChange = ({ filters, ...rest }) =>
    firebaseInstance.onCollectionChange({
      filters,
      ...rest,
    })

  const createDocument = (data, options) => {
    const validated = omitBy(data, isUndefined)
    return firebaseInstance.createDocument({ ...validated }, options)
  }
  const updateDocument = (data, options) => {
    const validated = omitBy(data, isUndefined)
    return firebaseInstance.updateDocument({ ...validated }, options)
  }

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseInstance,
        getDocuments,
        onCollectionChange,
        createDocument,
        updateDocument,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext)
