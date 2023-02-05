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
  const userId = localStorage.getItem('uid');
  const jwt = Cookies.get('jwt');
  const socket = useRef();

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKET_URI);
    socket.current.emit('new-user-add', userId);
  }, [userId])
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage])
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      console.log(data);
      setReceiveMessage(data)
    })
  }, [])
  if (jwt) {
    return (
      <>
        <Navbar />
        <main className='home-main-container'>
          <div className='left-right-chat-container'>
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
          </div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
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
