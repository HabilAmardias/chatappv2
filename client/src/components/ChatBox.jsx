import { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../lib/api-url";
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import './style/ChatBox.css'


export default function ChatBox({ jwt, chat, currentUser }) {
    const [otherUser, setOtherUser] = useState(null)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    useEffect(() => {
        const user = chat?.members?.find(({ _id }) => _id !== currentUser);
        const userId = user?._id;
        const getUserData = async () => {
            try {
                const requestOption = {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${jwt}` },
                    credentials: 'include'
                }
                const response = await fetch(`${API_URL}/users/${userId}`, requestOption);
                const data = await response.json();
                setOtherUser(data);
            } catch (err) {
                console.error(err);
            }
        }
        if (user !== null) {
            getUserData();
        }
    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchOption = {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${jwt}` },
                    credentials: 'include'
                }
                const response = await fetch(`${API_URL}/messages/${chat._id}`, fetchOption);
                const data = await response.json();
                console.log(data);
                setMessages(data);
            } catch (err) {
                console.error(err);
            }
        }
        if (chat !== null) {
            fetchMessages();
        }
    }, [chat])
    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }
    return (
        <>
            <div>
                {chat ? (
                    <>
                        <div className="chat-header">
                            <img
                                className='contact-avatar'
                                src={`https://avatars.dicebear.com/api/bottts/${otherUser?.username}.svg`}
                                alt='avatar'
                                width='40px'
                            />
                            <p>{otherUser?.username}</p>
                        </div>
                        <div className="chat-body">
                            {messages.map((message) => (
                                <div className={message.sender === currentUser ? "message own" : "message"} key={message._id}>
                                    <p className="message-text">{message.text}</p>
                                    <small>{format(message.time)}</small>
                                </div>
                            ))}
                        </div>
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className="send-message-button">Send</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <p>Tap a chat to start conversation</p>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}