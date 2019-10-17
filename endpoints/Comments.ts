import api from "../api/api"
import {DeviantArtCommentContext, DeviantArtCommentSearch} from "../types"

export class Comments {
    constructor(private readonly accessToken: string) {}

    public siblings = async (commentid: string, params?: {ext_item: boolean, offset: number, limit: number, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/comments/${commentid}/siblings`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtCommentContext>
    }

    public deviation = async (deviationid: string, params?: {commentid: string, maxdepth: number, offset: number, limit: number, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/comments/deviation/${deviationid}`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtCommentSearch>
    }

    public profile = async (username: string, params?: {commentid: string, maxdepth: number, offset: number, limit: number, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/comments/profile/${username}`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtCommentSearch>
    }

    public status = async (statusid: string, params?: {commentid: string, maxdepth: number, offset: number, limit: number, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/comments/status/${statusid}`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtCommentSearch>
    }
}
