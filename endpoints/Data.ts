import api from "../api/api"

export class Data {
    constructor(private readonly accessToken: string) {}

    public countries = async (params?: {mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/data/countries`, {params, access_token: this.accessToken})
        return result as Promise<{results: Array<{countryid: number, name: string}>}>
    }

    public privacy = async (params?: {mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/data/privacy`, {params, access_token: this.accessToken})
        return result as Promise<{text: string}>
    }

    public submission = async (params?: {mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/data/submission`, {params, access_token: this.accessToken})
        return result as Promise<{text: string}>
    }

    public tos = async (params?: {mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/data/tos`, {params, access_token: this.accessToken})
        return result as Promise<{text: string}>
    }
}
