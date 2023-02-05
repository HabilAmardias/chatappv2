import { useState } from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import './Login.css'

export default function Login() {
    const [login, setLogin] = useState(true);
    return (
        <>
            <main className="main-login-container">
                {login ? (
                    <SignInForm onLoginChange={setLogin} />
                ) : (
                    <SignUpForm onLoginChange={setLogin} />
                )}
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </main>
        </>
    )
}