import AddContact from "./AddContact";
import DeleteContact from "./DeleteContact";

export default function UserContacts({ jwt, userId, contacts, onContactsChange }) {
    return (
        <main>
            <section>
                <h2>Contacts</h2>
                <AddContact jwt={jwt} userId={userId} onContactsChange={onContactsChange} />
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