import api from "../api/api"
import {DeviantArtCuratedTags} from "../types/index"

export class Curated {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Fetches featured tags.
     */
    public tags = async (params?: {ext_preload?: boolean, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/curated/tags`, {params})
        return result as Promise<DeviantArtCuratedTags>
    }

}
