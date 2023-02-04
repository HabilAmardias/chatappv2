import { useEffect, useRef } from "react";
import { useState } from "react";
import { API_URL } from "../lib/api-url";
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import './style/ChatBox.css'


export default function ChatBox({ jwt, chat, currentUser, setSendMessage, receiveMessage }) {
    const [otherUser, setOtherUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scroll = useRef();

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
                setMessages(data);
            } catch (err) {
                console.error(err);
            }
        }
        if (chat !== null) {
            fetchMessages();
        }
    }, [chat])

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }
    const sendMessageHandler = async () => {
        const message = {
            sender: currentUser,
            text: newMessage,
            conversationId: chat._id
        }
        const requestOption = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(message)
        }
        try {
            const response = await fetch(`${API_URL}/messages`, requestOption);
            const data = await response.json();
            setMessages([...messages, data]);
            const receiver = chat.members.find(({ _id }) => _id !== currentUser);
            const receiverId = receiver._id;
            setSendMessage({ ...message, receiverId });
            setNewMessage('');
        } catch (err) {
            console.error(err);
        }

    }
    useEffect(() => {
        console.log('Message Received', receiveMessage);
        if (receiveMessage !== null && receiveMessage.conversationId === chat._id) {
            setMessages([...messages, receiveMessage]);
        }
    }, [receiveMessage])
    return (
        <>
            <div className="chat-box">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <img
                                className='contact-avatar'
                                src={`https://avatars.dicebear.com/api/bottts/${otherUser?.username}.svg`}
                                alt='avatar'
                                width='50px'
                            />
                            <p>{otherUser?.username}</p>
                        </div>
                        <div className="chat-body">
                            {messages.map((message) => (
                                <div ref={scroll} className={message.sender === currentUser ? "message own" : "message"} key={message._id}>
                                    <p className="message-text">{message.text}</p>
                                    <small>{format(message.time)}</small>
                                </div>
                            ))}
                        </div>
                        <div className="chat-sender">
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <button className="send-message-button" onClick={() => { sendMessageHandler() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                </svg>
                            </button>
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