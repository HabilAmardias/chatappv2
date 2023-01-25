import { useState } from "react"
import { API_URL } from "../lib/api-url";
import DeleteContact from "./DeleteContact";

export default function UserContacts({ jwt, userId, contacts, onContactsChange }) {
    const [addButton, setAddButton] = useState(true);
    const [friendUsername, setFriendUsername] = useState('');
    const addFriendHandler = async (e) => {
        e.preventDefault();
        try {
            const requestOption = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: friendUsername })
            }
            const response = await fetch(`${API_URL}/users/${userId}/contacts`, requestOption);
            const data = await response.json();
            onContactsChange(data.contacts);
            setAddButton(true);
        } catch (err) {
            console.error(err);
        }
    }
    const openAddInput = () => {
        setAddButton(false);
    };
    return (
        <main>
            <section>
                <h2>Contacts</h2>
                {addButton ? (
                    <button onClick={openAddInput}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </button>
                ) : (
                    <form method="POST" onSubmit={(e) => { addFriendHandler(e) }}>
                        <input type='text' placeholder="search username" value={friendUsername} required minLength='6' onChange={(e) => {
                            setFriendUsername(e.target.value);
                        }} />
                        <button type="submit">Add Friend</button>
                    </form>
                )}
            </section>
            <section>
                {contacts.map((c, index) => (
                    <div key={index}>
                        <section>
                            <img
                                className='contact-avatar'
                                src={`https://avatars.dicebear.com/api/bottts/${c.username}.svg`}
                                alt='avatar'
                                width='40px'
                            />
                        </section>
                        <section>
                            <p>{c.username}</p>
                            <small>{c.email}</small>
                            <DeleteContact jwt={jwt} userId={userId} index={index} onContactsChange={onContactsChange} />
                        </section>
                    </div>
                ))}
            </section>
        </main>
    )
}