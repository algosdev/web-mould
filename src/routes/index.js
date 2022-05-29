import React from 'react'
import { Route, Routes as ReactDomRoutes } from 'react-router-dom'
import Home from 'pages/home'
import View from 'pages/view'

function Routes() {
  return (
    <ReactDomRoutes>
      <Route path='/view' element={<View />} />
      <Route path='/' element={<Home />} />
    </ReactDomRoutes>
  )
}

export default Routes
