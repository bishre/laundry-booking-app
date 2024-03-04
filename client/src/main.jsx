import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/userContext.jsx';

const queryClient = new QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <App />
      <ToastContainer />
    </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
