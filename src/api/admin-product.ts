import client from "./base"

export interface Pricing {
    display_name: string
    duration: number
    price: string
    setup_fee: string
}

export interface Product {
    id: number
    name: string
    description: string
    category_id: number
    extension: string
    enabled: boolean
    pricing: Pricing[]
    settings: Record<string, string>
    stock: number
    stock_control: 1 | 2
}

export interface OptionValue {
    value: string
    display_name: string
    prices: OptionValuePrice[]
}

export interface OptionValuePrice {
    duration: number
    price: string
    setup_fee: string
}

export interface Option {
    product_id: number
    name: string
    display_name: string
    type: "select" | "text" | "password" | "textarea"
    regex: string
    values: OptionValue[]
}

export type ProductWithCategoryName = Product & { category_name: string }

export async function getProducts(category: string): Promise<ProductWithCategoryName[]> {
    return (await client.get("/admin/product", {
        params: {
            category
        }
    })).data.products;
}

export async function deleteProduct(id: number): Promise<void> {
    await client.delete(`/admin/product/${id}`);
}

export type ProductEdit = Omit<Product, "id"> & { options: Omit<Option, "product_id">[] }

export async function createProduct(product: ProductEdit): Promise<void> {
    await client.post("/admin/product", product);
}

export async function getProduct(id: number): Promise<ProductEdit> {
    return (await client.get(`/admin/product/${id}`)).data.product;
}

export async function updateProduct(id: number, product: ProductEdit): Promise<void> {
    await client.put(`/admin/product/${id}`, product);
}

export async function getExtensions(): Promise<string[]> {
    return (await client.get("/admin/product/extension-list")).data.extensions;
}

export interface ProductSetting {
    display_name: string
    name: string
    placeholder: string
    type: "string" | "text" | "select" | "servers"
    values: string[]
    description: string
    regex: string
}

export async function getProductSettings(extension: string, inputs: Record<string, string>): Promise<ProductSetting[]> {
    return (await client.post("/admin/product/extension-settings", {
        extension, inputs
    })).data.settings;
}