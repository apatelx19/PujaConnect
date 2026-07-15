import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PoojaProvider } from './context/PoojaContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PoojaProvider>
      <App />
    </PoojaProvider>
  </React.StrictMode>,
)
