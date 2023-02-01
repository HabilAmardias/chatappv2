import ChatBox from "./ChatBox";
import './style/RightSideChat.css'


export default function RightSideChat({ jwt, userId, currentChat, setSendMessage, receiveMessage }) {
    return (
        <div className="right-side-chat">
            <ChatBox jwt={jwt} chat={currentChat} currentUser={userId} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
        </div>
    )
}