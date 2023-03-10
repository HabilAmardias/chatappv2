import { API_URL } from "../lib/api-url"
import './style/DeleteContact.css'

export default function DeleteContact({ jwt, userId, index, onContactsChange }) {
    const deleteContactHandler = async () => {
        try {
            const requestOption = {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${jwt}` },
                credentials: 'include',
            }
            const response = await fetch(`${API_URL}/users/${userId}/contacts/${index}`, requestOption);
            const data = await response.json();
            onContactsChange(data.contacts);
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <section className="delete-contact-container">
            <button className="delete-contact-handler" onClick={deleteContactHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
        </section>
    )
}