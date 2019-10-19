import api from "../api/api"
import {DeviantArtData} from "../types/ApiTypes"

export class Data {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Returns a list of all countries.
     */
    public countries = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/data/countries`, {params})
        return result as Promise<{results: Array<{countryid: number, name: string}>}>
    }

    /**
     * Returns the privacy policy.
     */
    public privacy = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/data/privacy`, {params})
        return result as Promise<DeviantArtData>
    }

    /**
     * Returns the submission guidelines.
     */
    public submission = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/data/submission`, {params})
        return result as Promise<DeviantArtData>
    }

    /**
     * Returns the terms of service.
     */
    public tos = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/data/tos`, {params})
        return result as Promise<DeviantArtData>
    }
}
