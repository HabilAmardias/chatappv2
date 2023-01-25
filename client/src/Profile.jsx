import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "./lib/api-url";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import Loading from "./components/Loading";

export default function Profile() {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false);
    const jwt = Cookies.get('jwt');
    const { userId } = useParams();
    const getUser = async () => {
        if (!userId) return;
        setLoading(true);
        const requestOption = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${jwt}` },
            credentials: 'include'
        }
        const response = await fetch(`${API_URL}/users/${userId}`, requestOption);
        const data = await response.json();
        setUser(data);
        setLoading(false);
    }
    useEffect(() => {
        getUser();
    }, [userId])
    if (jwt) {
        return (
            <>
                <div>
                    {loading ? (
                        <>
                            <Loading />
                        </>
                    ) : (
                        <>
                            <Navbar userId={userId} />
                            <UserProfile user={user} />
                        </>
                    )}
                </div>
            </>
        )
    } else {

    }
}