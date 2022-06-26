import React from 'react'
import { Route, Routes as ReactDomRoutes } from 'react-router-dom'
import Editor from 'pages/editor'

function Routes() {
  return (
    <ReactDomRoutes>
      <Route path='/' element={<Editor />} />
    </ReactDomRoutes>
  )
}

export default Routes
