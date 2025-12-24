import { Invoice } from "./admin-invoice";
import client from "./base"


export interface Service {
    id: number;
    label: string;
    user_id: number;
    status: string;
    cancellation_reason: string | null;
    billing_cycle: number;
    price: string;
    extension: string;
    settings: Record<string, string>;
    expires_at: number;
    created_at: number;
    cancelled_at: number;
}


export interface ServiceJob {
    id: number;
    kind: string;
    state: string;
    scheduled_at: number;
    attempted_at: number | null;
    finalized_at: number | null;
    args: string;
    error: string;
}

export type ServiceWithName = Service & { name: string }


export async function getServices(page: number, user_id: number, server_id: number, status: string, label: string): Promise<{
    "services": ServiceWithName[],
    "total_pages": number
}> {
    return (await client.get("/admin/service", { params: { page, user_id, server_id, status, label } })).data
}

export async function getService(id: number): Promise<ServiceWithName> {
    return (await client.get(`/admin/service/${id}`)).data.service
}

export async function updateService(id: number, s: Pick<Service, "label" | "billing_cycle" | "price" | "expires_at">): Promise<void> {
    await client.put(`/admin/service/${id}`, s)
}

export async function updateStatus(id: number, status: string, reason: string, action: boolean): Promise<void> {
    await client.put(`/admin/service/${id}/status`, { status, cancellation_reason: reason, action })
}

export async function doAction(id: number, action: string) {
    return (await client.post(`/admin/service/${id}/action`, { action }))
}

export async function generateInvoice(id: number): Promise<void> {
    await client.post(`/admin/service/${id}/invoice`)
}

export async function getInvoices(id: number): Promise<Invoice[]> {
    return (await client.get(`/admin/service/${id}/invoice`)).data.invoices
}

export async function getAdminActions(id: number): Promise<string[]> {
    return (await client.get(`/admin/service/${id}/action`)).data.actions;
}

export async function updateServiceSettings(id: number, settings: Record<string, string>): Promise<void> {
    await client.put(`/admin/service/${id}/settings`, { ...settings })
}


export async function getServiceJobs(id: number): Promise<ServiceJob[]> {
    return (await client.get(`/admin/service/${id}/jobs`)).data.jobs;
}