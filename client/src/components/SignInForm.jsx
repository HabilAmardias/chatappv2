import { useState } from "react"
import { API_URL } from "../lib/api-url"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function SignInForm({ onLoginChange }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const SignInHandler = async (e) => {
        e.preventDefault();
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }
        const response = await fetch(`${API_URL}/users/login`, requestOption);
        const data = await response.json();
        if (data) {
            Cookies.set('jwt', data.token);
            Cookies.set('uid', data.user._id)
            navigate(`/home`);
        } else {
            navigate('/auth_error');
        }
    }
    const closeLogin = () => {
        onLoginChange(false);
    }
    return (
        <div>
            <h3>Sign-In</h3>
            <form onSubmit={(e) => { SignInHandler(e) }} method='POST'>
                <section>
                    <label htmlFor="email">Email:</label>
                    <input type='email' id="email" value={email} required onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </section>
                <section>
                    <label htmlFor="password">Password: </label>
                    <input type='password' id="password" value={password} required onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </section>
                <button type="submit">Sign-In</button>
            </form>
            <p>Do not have an account? <button onClick={closeLogin}>Sign-Up</button></p>
        </div>
    )
}