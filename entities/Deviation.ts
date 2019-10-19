import api from "../api/api"
import {DeviantArtDeviation, DeviationContent, DeviationDownload, DeviationEmbeddedContent, DeviationMetaData, DeviationWhoFaved} from "../types/index"

export class Deviation {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Gets a deviation from its deviation id.
     */
    public get = async (params: {deviationid: string, expand?: string}) => {
        const result = await this.api.get(`api/v1/oauth2/deviation/${params.deviationid}`, {params})
        return result as Promise<DeviantArtDeviation>
    }

    /**
     * Gets the meta data for multiple deviations.
     */
    public metaData = async (params: {deviationids: string[], ext_submission?: boolean, ext_camera?: boolean, ext_stats?: boolean, ext_collection?: boolean, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/deviation/metadata`, {params})
        return result as Promise<DeviationMetaData>
    }

    /**
     * Get a list of users who favorited the deviation.
     */
    public whoFaved = async (params: {deviationid: string, offset?: number, limit?: number}) => {
        const result = await this.api.get(`api/v1/oauth2/deviation/whofaved`, {params})
        return result as Promise<DeviationWhoFaved>
    }

    /**
     * Fetch the full data of a deviation.
     */
    public content = async (params: {deviationid: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/deviation/content`, {params})
        return result as Promise<DeviationContent>
    }

    /**
     * Fetches the file download of a deviation, if available.
     */
    public download = async (params: {deviationid: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/deviation/download/${params.deviationid}`, {params})
        return result as Promise<DeviationDownload>
    }

    /**
     * Fetches the embedded content in a deviation.
     */
    public embeddedContent = async (params: {deviationid: string, offset_deviationid?: string, offset?: number, limit?: number, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/deviation/embeddedcontent`, {params})
        return result as Promise<DeviationEmbeddedContent>
    }

}
