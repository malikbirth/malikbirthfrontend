import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import "@fontsource/poppins";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ChakraProvider>
     <App />
  </ChakraProvider>
  </BrowserRouter>,
)
