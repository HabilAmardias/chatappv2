import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './Login'
import Profile from './Profile'
import AuthError from './AuthError'
import ContactList from './ContactList'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Error404 from './Error404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/home',
    element: <App />
  },
  {
    path: '/contacts',
    element: <ContactList />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/auth_error',
    element: <AuthError />
  },
  {
    path: '*',
    element: <Error404 />
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
