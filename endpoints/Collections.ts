import api from "../api/api"
import {DeviantArtFolders, DeviantArtSearchResults} from "../types"

export class Collections {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    public get = async (folderid: string, params?: {username?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/collections/${folderid}`, {params})
        return result as Promise<DeviantArtSearchResults>
    }

    public folders = async (params?: {username?: string, ext_preload?: boolean, calculate_size?: boolean, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/collections/folders`, {params})
        return result as Promise<DeviantArtFolders>
    }
}
