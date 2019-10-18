import api from "../api/api"
import {DeviantArtCategoryTree, DeviantArtDailySearch, DeviantArtMoreLikeThisPreview,
DeviantArtQueryResults, DeviantArtSearchResults, DeviantArtTagSearch} from "../types/BrowseTypes"

export class Browse {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * This will fetch all of the category paths that you can use in the `category_path` parameter.
     */
    public categoryTree = async (params: {catpath: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/categorytree`, {params})
        return result as Promise<DeviantArtCategoryTree>
    }

    /**
     * Gets similar deviations to the one specified. Requires the deviation id.
     */
    public moreLikeThis = async (params: {seed: string, category?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/morelikethis`, {params})
        return result as Promise<DeviantArtSearchResults>
    }

    /**
     * Same as [[moreLikeThis]] but returns the preview result.
     */
    public moreLikeThisPreview = async (params: {seed: string, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/morelikethis/preview`, {params})
        return result as Promise<DeviantArtMoreLikeThisPreview>
    }

    /**
     * Fetches daily deviations for today or a certain date if it is specified.
     */
    public daily = async (params?: {date?: string, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/dailydeviations`, {params})
        return result as Promise<DeviantArtDailySearch>
    }

    /**
     * Searches deviations using a tag.
     */
    public tag = async (params: {tag: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/tags`, {params})
        return result as Promise<DeviantArtQueryResults>
    }

    /**
     * Searches a tag for similar tags.
     */
    public tagSearch = async (params: {tag_name: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/tags/search`, {params})
        return result as Promise<DeviantArtTagSearch>
    }

    /**
     * Searches the journals of a user.
     */
    public userJournals = async (params: {username: string, featured?: boolean, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/user/journals`, {params})
        return result as Promise<DeviantArtSearchResults>
    }

    /**
     * Searches for newest deviations.
     */
    public newest = async (params?: {category_path?: string, q?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/newest`, {params})
        return result as Promise<DeviantArtQueryResults>
    }

    /**
     * Searches for popular deviations.
     */
    public popular = async (params?: {category_path?: string, q?: string, timerange?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/popular`, {params})
        return result as Promise<DeviantArtQueryResults>
    }

    /**
     * Searches for hot deviations.
     */
    public hot = async (params?: {category_path?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/hot`, {params})
        return result as Promise<DeviantArtSearchResults>
    }

    /**
     * Searches for undiscovered deviations.
     */
    public undiscovered = async (params?: {category_path?: string, offset?: number, limit?: number, expand?: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/browse/undiscovered`, {params})
        return result as Promise<DeviantArtSearchResults>
    }

}
