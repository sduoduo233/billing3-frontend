import client from "./base"


export interface Me {
    email: string
    name: string
    role: "admin" | "user"
}

export async function me(): Promise<Me> {
    return (await client.get("/auth/me")).data
}

export async function login(email: string, password: string): Promise<string> {
    return (await client.post("/auth/login", {
        email, password
    })).data.token
}