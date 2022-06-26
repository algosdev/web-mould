import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import 'grapesjs/dist/css/grapes.min.css'
import { BrowserRouter } from 'react-router-dom'
import FirebaseProvider from 'services/firebase/FirebaseProvider'
import reportWebVitals from './reportWebVitals'
import Routes from './routes'

const firebaseConfig = {
  apiKey: 'AIzaSyAbifui4TMv-rPfQ8BRPjrAN5mgUEYOD_Q',
  authDomain: 'learn-f0b1f.firebaseapp.com',
  databaseURL: 'https://learn-f0b1f.firebaseio.com',
  projectId: 'learn-f0b1f',
  storageBucket: 'learn-f0b1f.appspot.com',
  messagingSenderId: '393763207232',
  appId: '1:393763207232:web:bafb83417c44235df787a5',
  measurementId: 'G-R82D1HRTTQ',
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider config={firebaseConfig}>
        <Routes />
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
