import api from "../api/api"
import {DeviantArtCommentContext, DeviantArtCommentSearch} from "../types"

export class Comments {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Fetches all of the replies to a certain comment, requires the comment id.
     */
    public siblings = async (commentid: string, params?: {ext_item?: boolean, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/comments/${commentid}/siblings`, {params})
        return result as Promise<DeviantArtCommentContext>
    }

    /**
     * Fetches all comments on a certain deviation.
     */
    public deviation = async (deviationid: string, params?: {commentid?: string, maxdepth?: number, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/comments/deviation/${deviationid}`, {params})
        return result as Promise<DeviantArtCommentSearch>
    }

    /**
     * Fetches all the comments on a user profile.
     */
    public profile = async (username: string, params?: {commentid?: string, maxdepth?: number, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/comments/profile/${username}`, {params})
        return result as Promise<DeviantArtCommentSearch>
    }

    /**
     * Fetches all the comments on a user status.
     */
    public status = async (statusid: string, params?: {commentid?: string, maxdepth?: number, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/comments/status/${statusid}`, {params})
        return result as Promise<DeviantArtCommentSearch>
    }
}
