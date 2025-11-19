import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast' //react-hot-toast.com

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* now we just wrapped our whole app in the routing*/}
    <App />
    <Toaster/> {/* for the react-hot-toast notifications */}
    </BrowserRouter>
  </StrictMode>,
)
