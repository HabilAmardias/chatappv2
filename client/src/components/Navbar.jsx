export default function Navbar({ userId }) {
    return (
        <header>
            <nav>
                <a href={`/${userId}`}>Home</a>
                <a href={`/${userId}/profile`}>Profile</a>
            </nav>
        </header>
    )
}