import './style/Navbar.css'
export default function Navbar() {
    return (
        <header className="navbar-container">
            <nav>
                <a href={`/home`}>Home</a>
                <a href={`/contacts`}>Contacts</a>
                <a href={`/profile`}>Profile</a>
            </nav>
        </header>
    )
}