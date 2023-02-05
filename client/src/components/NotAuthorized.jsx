import './style/NotAuthorized.css'
export default function NotAuthorized() {
    return (
        <>
            <main className="noauth-main-container">
                <div className="noauth-container">
                    <h2 className="noauth-header">You are not authenticated</h2>
                    <p className="noauth-text">You need to Sign-in to access this page</p>
                    <p className="redirect-login">Back to <a href="/">Sign-In</a> page</p>
                </div>
            </main>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        </>
    )
}