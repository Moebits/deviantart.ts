import api from "../api/api"
import {DeviantArtStatus, DeviantArtUser, DeviantArtUserFriends, DeviantArtUserProfile, DeviantArtUserStatuses, DeviantArtWatchers} from "../types"

export class User {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Gets all of the friends of the specified user, or yourself if none is specified.
     */
    public friends = async (username?: string, params?: {offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        if (!username) username = ""
        const result = await this.api.get(`api/v1/oauth2/user/friends/${username}`, {username, params})
        return result as Promise<DeviantArtUserFriends>
    }

    /**
     * Searches friends by their username.
     */
    public friendsSearch = async (query: string, params?: {username?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/user/friends/search`, {query, params})
        return result as Promise<{results: DeviantArtUser[]}>
    }

    /**
     * Gets all of the statuses of the specified user.
     */
    public statuses = async (username?: string, params?: {offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/user/statuses/`, {username, params})
        return result as Promise<DeviantArtUserStatuses>
    }

    /**
     * Fetches a specific status from its status id.
     */
    public status = async (statusid: string, params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/user/statuses/${statusid}`, {params})
        return result as Promise<DeviantArtStatus>
    }

    /**
     * Fetches the profile of the specified user.
     */
    public profile = async (username?: string, params?: {ext_collections?: boolean, ext_galleries?: boolean, expand?: string, mature_content?: boolean}) => {
        if (!username) username = ""
        const result = await this.api.get(`api/v1/oauth2/user/profile/${username}`, {params})
        return result as Promise<DeviantArtUserProfile>
    }

    /**
     * Fetches all the watchers of the specified user.
     */
    public watchers = async (username?: string, params?: {offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        if (!username) username = ""
        const result = await this.api.get(`api/v1/oauth2/user/watchers/${username}`, {params})
        return result as Promise<DeviantArtWatchers>
    }

}
