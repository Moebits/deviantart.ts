import api from "../api/api"
import {DeviantArtCommentContext, DeviantArtCommentSearch} from "../types/index"

export class Comments {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Fetches all of the replies to a certain comment, requires the comment id.
     */
    public siblings = async (params: {commentid: string, ext_item?: boolean, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/comments/${params.commentid}/siblings`, {params})
        return result as Promise<DeviantArtCommentContext>
    }

    /**
     * Fetches all comments on a certain deviation.
     */
    public deviation = async (params: {deviationid: string, commentid?: string, maxdepth?: number, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/comments/deviation/${params.deviationid}`, {params})
        return result as Promise<DeviantArtCommentSearch>
    }

    /**
     * Fetches all the comments on a user profile.
     */
    public profile = async (params: {username: string, commentid?: string, maxdepth?: number, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/comments/profile/${params.username}`, {params})
        return result as Promise<DeviantArtCommentSearch>
    }

    /**
     * Fetches all the comments on a user status.
     */
    public status = async (params: {statusid: string, commentid?: string, maxdepth?: number, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/comments/status/${params.statusid}`, {params})
        return result as Promise<DeviantArtCommentSearch>
    }
}
