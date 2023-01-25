export default function UserContacts({ contacts, onContactsChange }) {
    return (
        <main>
            <h2>Contacts</h2>
            {contacts.map((c) => (
                <div key={c._id}>
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
                    </section>
                </div>
            ))}
        </main>
    )
}