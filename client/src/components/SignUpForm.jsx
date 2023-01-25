import { useState } from "react";
import { API_URL } from "../lib/api-url";

export default function SignUpForm({ onLoginChange }) {
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const SignUpHandler = async (e) => {
        e.preventDefault();
        try {
            const requestOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: newUsername, password: newPassword, email: newEmail })
            }
            const user = await fetch(`${API_URL}/users`, requestOption);
            const userData = await user.json();
            const loginOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userData.email, password: userData.password })
            }
            const response = await fetch(`${API_URL}/users/login`, loginOption);
            const data = await response.json();
            if (data) {
                Cookies.set('jwt', data.token);
                navigate(`/${data.user._id}`);
            } else {
                navigate('/auth_error');
            }

        } catch (err) {
            console.error(err);
        }
    }

    const openLogin = () => {
        onLoginChange(true);
    }

    return (
        <div>
            <h3>Sign-Up</h3>
            <form onSubmit={(e) => { SignUpHandler(e) }} method='POST'>
                <section>
                    <label htmlFor="email">Email:</label>
                    <input type='email' id="email" value={newEmail} required onChange={(e) => {
                        setNewEmail(e.target.value);
                    }} />
                </section>
                <section>
                    <label htmlFor="username">Username: </label>
                    <input type='text' id="username" value={newUsername} minLength='6' required onChange={(e) => {
                        setNewUsername(e.target.value);
                    }} />
                </section>
                <section>
                    <label htmlFor="password">Password: </label>
                    <input type='password' id="password" value={newPassword} required minLength='8' onChange={(e) => {
                        setNewPassword(e.target.value);
                    }} />
                </section>
                <button type="submit">Sign-Un</button>
            </form>
            <p>Already have  an account? <button onClick={openLogin}></button></p>
        </div>
    )
}