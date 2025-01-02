import axios from "axios";


class ApiError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ApiError"
    }
}

const client = axios.create({
    baseURL: "/api",
})

client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, (error) => {
    console.error(error)
    return Promise.reject(error)
})

client.interceptors.response.use((response) => {
    if (response.data.error) {
        console.error(response)
        return Promise.reject(new ApiError(response.data.error))
    }
    return response
}, (error) => {
    console.error(error);
    if (!error.response) {
        return Promise.reject(new ApiError("Network Error"));
    }
    if (error.response.data.error) {
        return Promise.reject(new ApiError(error.response.data.error + " (" + error.response.status + ")"));
    } else {
        return Promise.reject(new ApiError(`${error.response.statusText} (${error.response.status})`))
    }
})

export default client;