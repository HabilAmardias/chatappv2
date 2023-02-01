import { useEffect } from "react";
import { useState } from "react"
import { API_URL } from "../lib/api-url";
import AddChatroom from "./AddChatroom";
import Chatroom from "./Chatroom";
import './style/LeftSideChat.css'

export default function LeftSideChat({ jwt, userId, currentChat, onCurrentChatChange }) {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const getChatrooms = async () => {
            try {
                const requestOption = {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${jwt}` },
                    credentials: 'include'
                }
                const response = await fetch(`${API_URL}/chatrooms/${userId}`, requestOption);
                const data = await response.json();
                setChats(data);
            } catch (err) {
                console.error(err)
            }
        }
        getChatrooms();
    }, [userId])
    return (
        <>
            <div className="left-side-chat">
                <div>
                    <h2>Chats</h2>
                    <AddChatroom jwt={jwt} userId={userId} chats={chats} setChats={setChats} />
                </div>
                <div className="chat-container">
                    <div className="chat-rooms">
                        {chats.map((chat) => (
                            <div className="chat" onClick={() => { onCurrentChatChange(chat) }} key={chat._id}>
                                <Chatroom jwt={jwt} chat={chat} currentUserId={userId} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}