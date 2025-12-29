import { useEffect } from "react"
import { logout } from "../api/auth"



export default function Logout() {


    useEffect(() => {
        logout().finally(() => {
            localStorage.removeItem("token");
            document.cookie = `token=; path=/; max-age=0`;
        });
    })

    return <div>
        Logged out
    </div>
}