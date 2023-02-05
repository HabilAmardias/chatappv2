import './AuthError.css'

export default function AuthError() {
    return (
        <>
            <main className="autherror-main-container">
                <div className="autherror-container">
                    <h2 className="autherror-header">Oops Something Went Wrong</h2>
                    <p className="redirect-login">Back to <a href="/">Sign-In</a> page</p>
                </div>
            </main>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        </>
    )
}