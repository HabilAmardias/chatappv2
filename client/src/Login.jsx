import { useState } from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

export default function Login() {
    const [login, setLogin] = useState(true);
    return (
        <>
            <main>
                {login ? (
                    <SignInForm onLoginChange={setLogin} />
                ) : (
                    <SignUpForm onLoginChange={setLogin} />
                )}
            </main>
        </>
    )
}