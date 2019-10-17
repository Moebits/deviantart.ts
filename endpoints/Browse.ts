import api from "../api/api"
import {DeviantArtDeviation} from "../types"
import {DeviantArtCategoryTree, DeviantArtMoreLikeThisPreview, DeviantArtQueryResults, DeviantArtSearchResults} from "./../types/BrowseTypes"

export class Browse {
    constructor(private readonly accessToken: string) {}

    public categoryTree = async (catpath: string, params?: {mature_content: string}) => {
        const result = await api.get(`api/v1/oauth2/browse/categorytree`, {catpath, params, access_token: this.accessToken})
        return result as Promise<DeviantArtCategoryTree>
    }

    public moreLikeThis = async (seed: string, params?: {category: string, offset: number, limit: number, expand: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/morelikethis`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtSearchResults>
    }

    public moreLikeThisPreview = async (seed: string, params?: {expand: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/morelikethis/preview`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtMoreLikeThisPreview>
    }

    public dailyDeviations = async (params?: {date: string, expand: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/dailydeviations`, {params, access_token: this.accessToken})
        return result as Promise<{results: DeviantArtDeviation[]}>
    }

    public tags = async (tag: string, params?: {offset: number, limit: number, expand: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/tags`, {tag, params, access_token: this.accessToken})
        return result as Promise<DeviantArtQueryResults>
    }

    public tagsSearch = async (tag_name: string, params?: {mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/tags/search`, {tag_name, params, access_token: this.accessToken})
        return result as Promise<{results: {tag_name: string[]}}>
    }

    public userJournals = async (username: string, params?: {featured: boolean, offset: number, limit: number, expand: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/user/journals`, {username, params, access_token: this.accessToken})
        return result as Promise<DeviantArtSearchResults>
    }

    public newest = async (params?: {category_path: string, q: string, offset: number, limit: number, expand: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/newest`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtQueryResults>
    }

    public popular = async (params?: {category_path: string, q: string, timerange: string, offset: number, limit: number, expand: string, mature_content: boolean}) => {
        console.log(this.accessToken)
        console.log(params)
        const result = await api.get(`api/v1/oauth2/browse/popular`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtQueryResults>
    }

    public hot = async (params?: {category_path: string, offset: number, limit: number, expand: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/hot`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtSearchResults>
    }

    public undiscovered = async (params?: {category_path: string, offset: number, limit: number, expand: string, mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/browse/undiscovered`, {params, access_token: this.accessToken})
        return result as Promise<DeviantArtSearchResults>
    }

}
