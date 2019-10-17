import api from "../api/api"
import {DeviantArtCurated, DeviantArtCuratedTags} from "../types"

export class Curated {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    public get = async (params?: {offset?: number}) => {
        const result = await this.api.get(`api/v1/oauth2/curated`, {params})
        return result as Promise<DeviantArtCurated>
    }
    public tags = async (params?: {ext_preload?: boolean, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/curated/tags`, {params})
        return result as Promise<DeviantArtCuratedTags>
    }

}
