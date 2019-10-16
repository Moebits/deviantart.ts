import api from "../api/api"
import {GalleryAll, GalleryFolders, GalleryResult} from "./../types/GalleryTypes"

export class Gallery {
    constructor(private readonly accessToken: string) {}

    public get = async (folderId?: string, params?: {username?: string, mode?: string, offset?: string, limit?: string, expand?: string, mature_content?: boolean}) => {
        if (!folderId) folderId = ""
        const result = await api.get(`api/v1/oauth2/gallery/${folderId}`, {params, access_token: this.accessToken})
        return result as Promise<GalleryResult>
    }

    public all = async (params: {username?: string, offset?: string, limit?: string, expand?: string, mature_content?: boolean}) => {
        const result = await api.get(`api/v1/oauth2/gallery/all`, {params, access_token: this.accessToken})
        return result as Promise<GalleryAll>
    }

    public folders = async (params: {username?: string, calculate_size?: boolean, ext_preload?: boolean, offset: number, limit?: number, mature_content?: boolean}) => {
        const result = await api.get(`api/v1/oauth2/gallery/folders`, {params, access_token: this.accessToken})
        return result as Promise<GalleryFolders>
    }
}
