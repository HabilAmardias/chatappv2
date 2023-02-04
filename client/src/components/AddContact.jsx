import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField, IconButton } from '@mui/material';
import { useState } from 'react';
import { API_URL } from "../lib/api-url";
import './style/AddContact.css'

export default function AddContact({ jwt, userId, onContactsChange }) {
    const [openAdd, setOpenAdd] = useState(false);
    const [friendUsername, setFriendUsername] = useState('');
    const addFriendHandler = async () => {
        if (friendUsername !== '') {
            const requestOption = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: friendUsername })
            }
            try {
                const response = await fetch(`${API_URL}/users/${userId}/contacts`, requestOption);
                const data = await response.json();
                onContactsChange(data.contacts);
                setFriendUsername('');
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log('Enter a username!');
        }

    }
    const handleOpenAddContact = () => {
        setOpenAdd(true);
    }
    const handleCloseContact = () => {
        setOpenAdd(false);
    }
    return (
        <>
            <button onClick={handleOpenAddContact} className='add-contact-handler'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                </svg>
            </button>
            <Dialog open={openAdd} onClose={handleCloseContact}>
                <DialogTitle>Add A Friend</DialogTitle>
                <DialogContent>
                    <TextField autoFocus type='text' value={friendUsername} id='standard-required' label='Username' fullWidth variant='standard' required onChange={(e) => {
                        setFriendUsername(e.target.value);
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContact}>Cancel</Button>
                    <Button onClick={() => {
                        addFriendHandler();
                        handleCloseContact();
                    }}>
                        Add Friend
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}