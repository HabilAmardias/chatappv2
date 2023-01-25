import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './components/Navbar';
import './App.css'
import Cookies from 'js-cookie';

function App() {
  const { userId } = useParams();
  const jwt = Cookies.get('jwt')
  if (jwt) {
    return (
      <>
        <Navbar userId={userId} />
        <main />
      </>
    )
  }
}

export default App
