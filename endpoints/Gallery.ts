import api from "../api/api"
import {DeviantArtGalleryAll, DeviantArtGalleryFolders, DeviantArtGalleryResult} from "../types/index"

export class Gallery {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Gets all of the deviations in the folder, requires the folder id.
     */
    public get = async (params?: {folderid?: string, username?: string, mode?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        if (!params.folderid) params.folderid = ""
        const result = await this.api.get(`api/v1/oauth2/gallery/${params.folderid}`, {params})
        return result as Promise<DeviantArtGalleryResult>
    }

    /**
     * Get all of the deviations of a certain user, yourself if none is specified.
     */
    public all = async (params?: {username?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/gallery/all`, {params})
        return result as Promise<DeviantArtGalleryAll>
    }

    /**
     * Get all of the folders of a certain user, or yourself if none is specified.
     */
    public folders = async (params?: {username?: string, calculate_size?: boolean, ext_preload?: boolean, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/gallery/folders`, {params})
        return result as Promise<DeviantArtGalleryFolders>
    }
}
