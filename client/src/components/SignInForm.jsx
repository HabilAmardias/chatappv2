import { useState } from "react"
import { API_URL } from "../lib/api-url"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './style/SignInForm.css'
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
            localStorage.setItem('uid', data.user._id);
            navigate(`/home`);
        } else {
            navigate('/auth_error');
        }
    }
    const closeLogin = () => {
        onLoginChange(false);
    }
    return (
        <>
            <div className="sign-in-container">
                <h3 className="sign-in-header">Sign-In</h3>
                <form onSubmit={(e) => { SignInHandler(e) }} method='POST' className="form">
                    <section className="signin-email-container">
                        <label htmlFor="email" className="signin-email-label">Email:</label>
                        <input className="signin-email-input" type='email' id="email" value={email} required onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </section>
                    <section className="signin-password-container">
                        <label htmlFor="password" className="signin-password-label">Password: </label>
                        <input className="signin-password-input" type='password' id="password" value={password} required onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </section>
                    <button type="submit" className="signin-submit-button">Sign-In</button>
                </form>
                <p className="signin-text">Do not have an account? <button className="signup-handler" onClick={closeLogin}>Sign-Up</button></p>
            </div>
        </>
    )
}