import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './components/Navbar';
import './App.css'
import Cookies from 'js-cookie';
import NotAuthorized from './components/NotAuthorized';
import LeftSideChat from './components/LeftSideChat';
import RightSideChat from './components/RightSideChat';

function App() {
  const [currentChat, setCurrentChat] = useState(null);
  const { userId } = useParams();
  const jwt = Cookies.get('jwt');
  if (jwt) {
    return (
      <>
        <Navbar userId={userId} />
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
            onCurrentChatChange={setCurrentChat}
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
