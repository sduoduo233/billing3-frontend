import { useEffect } from "react"
import { logout } from "../api/auth"



export default function Logout() {


    useEffect(() => {
        logout().finally(() => {
            localStorage.removeItem("token");
        });
    })

    return <div>
        Logged out
    </div>
}