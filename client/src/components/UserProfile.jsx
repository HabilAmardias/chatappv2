import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"

export default function UserProfile({ user }) {
    const navigate = useNavigate();
    const SignOutHandler = () => {
        navigate('/');
        Cookies.remove('jwt');
    }
    return (
        <main>
            <h2>Profile</h2>
            <section>
                <h3>{user.username}</h3>
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
            <section>
                <button onClick={SignOutHandler}>Sign-Out</button>
            </section>
        </main>
    )
}