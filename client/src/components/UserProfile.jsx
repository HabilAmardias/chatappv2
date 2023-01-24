export default function UserProfile({ user }) {
    return (
        <main>
            <section>
                <h2>{user.username}</h2>
                <img
                    className='profile-avatar'
                    src={`https://avatars.dicebear.com/api/bottts/${user.username}.svg`}
                    alt='avatar'
                    width='200px'
                />
            </section>
            <section>
                <p>{`UserID: ${user._id}`}</p>
                <p>{`Email: ${user.email}`}</p>
            </section>
        </main>
    )
}