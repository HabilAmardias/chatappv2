import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/api-url";
import Cookies from "js-cookie";

export default function SignUpForm({ onLoginChange }) {
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
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
                body: JSON.stringify({ email: userData.email, password: newPassword })
            }
            const response = await fetch(`${API_URL}/users/login`, loginOption);
            const data = await response.json();
            if (data) {
                Cookies.set('jwt', data.token);
                localStorage.setItem('uid', data.user._id);
                navigate(`/home`);
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
        <>
            <div className="sign-in-container">
                <h3 className="sign-in-header">Sign-Up</h3>
                <form onSubmit={(e) => { SignUpHandler(e) }} method='POST' className="form">
                    <section className="signin-email-container">
                        <label htmlFor="email" className="signin-email-label">Email:</label>
                        <input className="signin-email-input" type='email' id="email" value={newEmail} required onChange={(e) => {
                            setNewEmail(e.target.value);
                        }} />
                    </section>
                    <section className="signin-username-container">
                        <label htmlFor="username" className="signin-username-label">Username: </label>
                        <input className="signin-username-input" type='text' id="username" value={newUsername} minLength='6' required onChange={(e) => {
                            setNewUsername(e.target.value);
                        }} />
                    </section>
                    <section className="signin-password-container">
                        <label htmlFor="password" className="signin-password-label">Password: </label>
                        <input className="signin-password-input" type='password' id="password" value={newPassword} required minLength='8' onChange={(e) => {
                            setNewPassword(e.target.value);
                        }} />
                    </section>
                    <button type="submit" className="signin-submit-button">Sign-Up</button>
                </form>
                <p className="signin-text">Already have  an account? <button className="signup-handler" onClick={openLogin}>Sign-In</button></p>
            </div>
        </>
    )
}