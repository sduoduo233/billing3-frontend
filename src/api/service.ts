import client from "./base"


export interface Service {
    id: number
    label: string
    user_id: number
    status: string
    cancellation_reason: string | null
    billing_cycle: number
    price: number
    expires_at: number
    created_at: number
    cancelled_at: number | null
}

export async function getServices(): Promise<Service[]> {
    return (await client.get("/service")).data.services
}

export async function getService(id: number): Promise<Service> {
    return (await client.get("/service/" + id)).data.service
}

export async function getClientActions(id: number): Promise<string[]> {
    return (await client.get(`/service/${id}/action`)).data.actions;
}

export async function getInfoPage(id: number): Promise<string> {
    return (await client.get(`/service/${id}/info`)).data;
}

export async function doAction(id: number, action: string) {
    return (await client.post(`/service/${id}/action`, { action }))
}