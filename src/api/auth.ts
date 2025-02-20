import client from "./base"


export interface Me {
    email: string
    name: string
    role: "admin" | "user"
    address: string
}

export async function me(): Promise<Me> {
    return (await client.get("/auth/me")).data
}

export async function logout(): Promise<Me> {
    return (await client.post("/auth/logout")).data
}

export async function login(email: string, password: string): Promise<string> {
    return (await client.post("/auth/login", {
        email, password
    })).data.token
}