import { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../lib/api-url";
import './style/ChatBox.css'

export default function ChatBox({ jwt, chat, currentUser }) {
    const [otherUser, setOtherUser] = useState(null)
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