import { useState } from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Head from "./components/Head";

export default function Login() {
    const [login, setLogin] = useState(true);
    return (
        <>
            <Head />
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