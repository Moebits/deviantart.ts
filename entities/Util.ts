import api from "../api/api"
import {DeviantArtPlacebo} from "../types/ApiTypes"

export class Util {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken) {}

    /**
     * Sends a placebo API query to check that your access token is still valid.
     */
    public placebo = async (params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/placebo`, {params})
        return result as Promise<DeviantArtPlacebo>
    }
}
