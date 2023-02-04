import { useEffect } from "react";
import { useState } from "react"
import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@mui/material";
import { API_URL } from "../lib/api-url";
import './style/AddChatroom.css'

export default function AddChatroom({ jwt, userId, chats, setChats }) {
    const [openAdd, setOpenAdd] = useState(false);
    const [friends, setFriends] = useState([]);
    const handleAddChatroom = () => {
        setOpenAdd(true)
    }
    const handleCloseAdd = () => {
        setOpenAdd(false)
    }
    const addChatroomHandler = async (id) => {
        const requestOption = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ senderId: userId, receiverId: id })
        }
        try {
            const response = await fetch(`${API_URL}/chatrooms`, requestOption);
            const data = await response.json();
            setChats([...chats, data]);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        const getFriends = async () => {
            const requestOption = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${jwt}` },
                credentials: 'include'
            }
            const response = await fetch(`${API_URL}/users/${userId}`, requestOption);
            const data = await response.json();
            setFriends(data.contacts);
        }
        getFriends();
    }, []);
    return (
        <>
            <button onClick={handleAddChatroom} className='open-add-handler'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
            </button>
            <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id='alert-dialog-title'>Add Conversation</DialogTitle>
                <DialogContent>
                    {friends.map((friend, index) => (
                        <div className="add-conversation" key={friend._id} onClick={(e) => {
                            addChatroomHandler(friend._id);
                            handleCloseAdd();
                        }}>
                            <section>
                                <img
                                    className='contact-avatar'
                                    src={`https://avatars.dicebear.com/api/bottts/${friend.username}.svg`}
                                    alt='avatar'
                                    width='40px'
                                />
                            </section>
                            <section>
                                <p className="friend-username">{friend.username}</p>
                                <small className="friend-email">{friend.email}</small>
                            </section>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}