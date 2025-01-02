import client from "./base"

export interface User {
    id: number
    email: string
    name: string
    role: "admin" | "user"
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    zip_code: string | null
}

export type UserEdit = Omit<User, "id"> & { password: string }

export async function getUsers(page: number, search: string): Promise<{
    "total_pages": number,
    "users": User[]
}> {
    return (await client.get("/admin/user", {
        params: { page, search }
    })).data
}

export async function getUser(id: number): Promise<User> {
    return (await client.get(`/admin/user/${id}`)).data.user
}

export async function updateUser(id: number, user: UserEdit): Promise<void> {
    (await client.put("/admin/user/" + id, user))
}