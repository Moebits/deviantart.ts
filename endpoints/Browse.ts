import api from "../api/api"
import {DeviantArtDeviation} from "../types"
import {DeviantArtCategoryTree, DeviantArtMoreLikeThisPreview, DeviantArtQueryResults, DeviantArtSearchResults} from "./../types/BrowseTypes"

export class Browse {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    public categoryTree = async (catpath: string, params?: {mature_content?: string}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/categorytree`, {catpath, params})
        return result as Promise<DeviantArtCategoryTree>
    }

    public moreLikeThis = async (seed: string, params?: {category?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/morelikethis`, {seed, params})
        return result as Promise<DeviantArtSearchResults>
    }

    public moreLikeThisPreview = async (seed: string, params?: {expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/morelikethis/preview`, {seed, params})
        return result as Promise<DeviantArtMoreLikeThisPreview>
    }

    public dailyDeviations = async (params?: {date?: string, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/dailydeviations`, {params})
        return result as Promise<{results: DeviantArtDeviation[]}>
    }

    public tags = async (tag: string, params?: {offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/tags`, {tag, params})
        return result as Promise<DeviantArtQueryResults>
    }

    public tagsSearch = async (tag_name: string, params?: {mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/tags/search`, {tag_name, params})
        return result as Promise<{results: {tag_name: string[]}}>
    }

    public userJournals = async (username: string, params?: {featured?: boolean, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/user/journals`, {username, params})
        return result as Promise<DeviantArtSearchResults>
    }

    public newest = async (params?: {category_path?: string, q?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/newest`, {params})
        return result as Promise<DeviantArtQueryResults>
    }

    public popular = async (params?: {category_path?: string, q?: string, timerange?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/popular`, {params})
        return result as Promise<DeviantArtQueryResults>
    }

    public hot = async (params?: {category_path?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/hot`, {params})
        return result as Promise<DeviantArtSearchResults>
    }

    public undiscovered = async (params?: {category_path?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/undiscovered`, {params})
        return result as Promise<DeviantArtSearchResults>
    }

}
