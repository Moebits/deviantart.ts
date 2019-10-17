import api from "../api/api"
import {DeviantArtCurated, DeviantArtCuratedTags} from "../types"

export class Curated {
    constructor(private readonly accessToken: string) {}

    public get = async (params?: {offset: number}) => {
        const result = await api.get(`api/v1/oauth2/curated`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtCurated>
    }
    public tags = async (params?: {ext_preload: boolean, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/curated/tags`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtCuratedTags>
    }

}
