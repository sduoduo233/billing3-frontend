import client from "./base"


export interface Me {
    email: string
    name: string
    role: "admin" | "user"
    full_address: string
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    zip_code: string | null
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

export async function updateProfile(user: Omit<Me, "email" | "name" | "role" | "full_address">): Promise<void> {
    await client.put("/auth/profile", user)
}