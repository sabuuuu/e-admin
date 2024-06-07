import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { SnackbarProvider } from 'notistack';
import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider } from './context/authContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthContextProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </BrowserRouter>
)
