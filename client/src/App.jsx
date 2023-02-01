import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import NotAuthorized from './components/NotAuthorized';
import LeftSideChat from './components/LeftSideChat';
import RightSideChat from './components/RightSideChat';

function App() {
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const userId = Cookies.get('uid');
  const jwt = Cookies.get('jwt');
  const socket = useRef();
  useEffect(() => {
    socket.current = io('http://localhost:8800');
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage])
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setReceiveMessage(data)
    })
  }, [])
  if (jwt) {
    return (
      <>
        <Navbar />
        <main className='home-main-container'>
          <LeftSideChat
            jwt={jwt}
            userId={userId}
            currentChat={currentChat}
            onCurrentChatChange={setCurrentChat}
          />
          <RightSideChat
            jwt={jwt}
            userId={userId}
            currentChat={currentChat}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        </main>
      </>
    )
  } else {
    return (
      <NotAuthorized />
    )
  }
}

export default App
