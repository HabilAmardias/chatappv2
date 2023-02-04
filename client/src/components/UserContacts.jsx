import AddContact from "./AddContact";
import DeleteContact from "./DeleteContact";
import './style/UserContacts.css'

export default function UserContacts({ jwt, userId, contacts, onContactsChange }) {
    return (
        <main className="contact-main-container">
            <section className="contact-header">
                <h2>Contacts</h2>
                <AddContact jwt={jwt} userId={userId} onContactsChange={onContactsChange} />
            </section>
            <section className="contacts-container">
                {contacts.map((c, index) => (
                    <div key={index} className='contact'>
                        <section className="contact-image">
                            <img
                                className='contact-avatar'
                                src={`https://avatars.dicebear.com/api/bottts/${c.username}.svg`}
                                alt='avatar'
                                width='40px'
                            />
                        </section>
                        <section className="contact-info">
                            <p className="contact-username">{c.username}</p>
                            <small className="contact-email">{c.email}</small>
                        </section>
                        <DeleteContact jwt={jwt} userId={userId} index={index} onContactsChange={onContactsChange} />
                    </div>
                ))}
            </section>
        </main>
    )
}