import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react"
import { API_URL } from "./lib/api-url";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import UserContacts from "./components/UserContacts";
import NotAuthorized from "./components/NotAuthorized";

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const jwt = Cookies.get('jwt');
    const userId = localStorage.getItem('uid');
    useEffect(() => {
        const getContacts = async () => {
            setLoading(true);
            const requestOption = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${jwt}` },
                credentials: 'include'
            }
            const response = await fetch(`${API_URL}/users/${userId}`, requestOption);
            const data = await response.json();
            setContacts(data.contacts);
            setLoading(false)
        }
        getContacts();
    }, []);
    if (jwt) {
        return (
            <div>
                {loading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        <Navbar />
                        <UserContacts jwt={jwt} userId={userId} contacts={contacts} onContactsChange={setContacts} />
                    </>
                )}
            </div>
        )
    } else {
        return (
            <NotAuthorized />
        )
    }
}