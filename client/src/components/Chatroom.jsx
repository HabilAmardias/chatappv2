import { useEffect } from "react";
import { useState } from "react"
import { API_URL } from "../lib/api-url";
import Loading from "./Loading";
import './style/Chatroom.css'

export default function Chatroom({ chat, currentUserId, jwt }) {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const user = chat.members.find(({ _id }) => _id !== currentUserId);
        const userId = user._id
        const getUserData = async () => {
            setIsLoading(true)
            try {
                const requestOption = {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${jwt}` },
                    credentials: 'include'
                }
                const response = await fetch(`${API_URL}/users/${userId}`, requestOption);
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error(err);
            }
            setIsLoading(false)
        }
        getUserData();
    }, [])
    return (
        <>
            {isLoading ? (
                <>
                    <Loading />
                </>
            ) : (
                <>
                    <div className="chatroom-container">
                        <img
                            className='contact-avatar'
                            src={`https://avatars.dicebear.com/api/bottts/${userData.username}.svg`}
                            alt='avatar'
                            width='40px'
                        />
                        <p>{userData.username}</p>
                    </div>
                    <hr />
                </>
            )}
        </>
    )
}