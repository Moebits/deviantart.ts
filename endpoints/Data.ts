import api from "../api/api"

export class Data {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    public countries = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/data/countries`, {params})
        return result as Promise<{results: Array<{countryid: number, name: string}>}>
    }

    public privacy = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/data/privacy`, {params})
        return result as Promise<{text: string}>
    }

    public submission = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/data/submission`, {params})
        return result as Promise<{text: string}>
    }

    public tos = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/data/tos`, {params})
        return result as Promise<{text: string}>
    }
}
