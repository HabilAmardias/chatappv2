import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './Login'
import Profile from './Profile'
import AuthError from './AuthError'
import ContactList from './ContactList'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/:userId',
    element: <App />
  },
  {
    path: '/:userId/contacts',
    element: <ContactList />
  },
  {
    path: '/:userId/profile',
    element: <Profile />
  },
  {
    path: '/auth_error',
    element: <AuthError />
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
