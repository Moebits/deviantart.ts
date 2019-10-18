import api from "../api/api"
import {DeviantArtFolders, DeviantArtSearchResults} from "../types/index"

export class Collections {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Gets all of the deviations in a folder. Unless if you are searching for your own folders, you must specify the username of the user.
     */
    public get = async (params: {folderid: string, username?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/collections/${params.folderid}`, {params})
        return result as Promise<DeviantArtSearchResults>
    }

    /**
     * Fetches all the folders of the specified user. Defaults to the authenticated user if none is specified.
     */
    public folders = async (params?: {username?: string, ext_preload?: boolean, calculate_size?: boolean, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/collections/folders`, {params})
        return result as Promise<DeviantArtFolders>
    }
}
