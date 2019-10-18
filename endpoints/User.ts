import api from "../api/api"
import {DeviantArtFriendSearch, DeviantArtStatus, DeviantArtUserFriends, DeviantArtUserProfile, DeviantArtUserStatuses, DeviantArtWatchers} from "../types/index"

export class User {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Gets all of the friends of the specified user, or yourself if none is specified.
     */
    public friends = async (params?: {username?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        if (!params.username) params.username = ""
        const result = await this.api.get(`api/v1/oauth2/user/friends/${params.username}`, {params})
        return result as Promise<DeviantArtUserFriends>
    }

    /**
     * Searches friends by their username.
     */
    public friendsSearch = async (params: {query: string, username?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/user/friends/search`, {params})
        return result as Promise<DeviantArtFriendSearch>
    }

    /**
     * Gets all of the statuses of the specified user.
     */
    public statuses = async (params?: {username?: string, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/user/statuses/`, {params})
        return result as Promise<DeviantArtUserStatuses>
    }

    /**
     * Fetches a specific status from its status id.
     */
    public status = async (params: {statusid: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/user/statuses/${params.statusid}`, {params})
        return result as Promise<DeviantArtStatus>
    }

    /**
     * Fetches the profile of the specified user.
     */
    public profile = async (params?: {username?: string, ext_collections?: boolean, ext_galleries?: boolean, expand?: string, mature_content?: boolean}) => {
        if (!params.username) params.username = ""
        const result = await this.api.get(`api/v1/oauth2/user/profile/${params.username}`, {params})
        return result as Promise<DeviantArtUserProfile>
    }

    /**
     * Fetches all the watchers of the specified user.
     */
    public watchers = async (params?: {username?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        if (!params.username) params.username = ""
        const result = await this.api.get(`api/v1/oauth2/user/watchers/${params.username}`, {params})
        return result as Promise<DeviantArtWatchers>
    }

}
