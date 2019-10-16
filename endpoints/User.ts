import api from "../api/api"
import {DeviantArtStatus, DeviantArtUser, DeviantArtUserFriends, DeviantArtUserProfile, DeviantArtUserStatuses, DeviantArtWatchers} from "../types"

export class User {
    constructor(private readonly accessToken: string) {}

    public friends = async (username?: string, params?: {offset: number, limit: number, expand: string, mature_content: boolean}) => {
        if (!username) username = ""
        const result = await api.get(`api/v1/oauth2/user/friends/${username}`, {username, params, access_token: this.accessToken})
        return result as Promise<DeviantArtUserFriends>
    }

    public friendsSearch = async (query: string, params?: {username: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/user/friends/search`, {query, params, access_token: this.accessToken})
        return result as Promise<{results: DeviantArtUser[]}>
    }

    public statuses = async (username?: string, params?: {offset: number, limit: number, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/user/statuses/`, {username, params, access_token: this.accessToken})
        return result as Promise<DeviantArtUserStatuses>
    }

    public status = async (statusid: string, params?: {mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/user/statuses/${statusid}`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtStatus>
    }

    public profile = async (username?: string, params?: {ext_collections: boolean, ext_galleries: boolean, expand: string, mature_content: boolean}) => {
        if (!username) username = ""
        const result = await api.get(`api/v1/oauth2/user/profile/${username}`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtUserProfile>
    }

    public watchers = async (username?: string, params?: {offset: number, limit: number, expand: string, mature_content: boolean}) => {
        if (!username) username = ""
        const result = await api.get(`api/v1/oauth2/user/watchers/${username}`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtWatchers>
    }

}
