import React, { useEffect, useState, useCallback } from 'react'
import grapesjs from 'grapesjs'
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import { useFirebase } from 'services/firebase/FirebaseProvider'
import { debounce } from 'lodash'

export default function Editor() {
  const [editorState, setEditorState] = useState(null)
  const { getDocument, updateDocument } = useFirebase()
  const [isLoading, setIsLoading] = useState(true)
  const syncWithDatabase = useCallback(
    debounce(() => {
      updateDocument(editorState.getProjectData(), {
        collectionName: 'pages',
        id: 'defaultPage',
      })
    }, 1000),
    [editorState]
  )
  useEffect(() => {
    const initialState = grapesjs.init({
      container: '#editor',
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        gjsPresetWebpage: {},
      },
    })
    setEditorState(initialState)
  }, [])
  useEffect(() => {
    if (editorState) {
      getDocument({
        id: 'defaultPage',
        collectionName: 'pages',
      })
        .then((res) => {
          editorState.loadProjectData(res)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log('Err', err)
        })
      editorState.on('update', (res) => {
        syncWithDatabase()
      })
    }
  }, [editorState])
  return (
    <>
      <p>{isLoading ? 'Loading page...' : ''}</p>
      <div id='editor' />
    </>
  )
}
