import ChatBox from "./ChatBox";
import './style/RightSideChat.css'


export default function RightSideChat({ jwt, userId, currentChat, onCurrentChatChange }) {
    return (
        <div className="right-side-chat">
            <ChatBox jwt={jwt} chat={currentChat} currentUser={userId} />
        </div>
    )
}