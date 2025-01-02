import { createContext } from "react"
import { Me } from "../api/auth";

export const UserContext = createContext<{
    user: Me | null
    setUser: (u: Me | null) => void
}>({
    user: null,
    setUser: (_u) => { }
})

console.log("")
console.log("") 