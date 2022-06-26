import React, { useEffect, useState } from 'react'
import grapesjs from 'grapesjs'
import gjsPresetWebpage from 'grapesjs-preset-webpage'

export default function Editor() {
  const [editorState, setEditorState] = useState(null)
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
  console.log('editorState', editorState)
  return <div id='editor' />
}
