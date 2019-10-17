import api from "../api/api"
import {DeviantArtStash, DeviantArtStashItem} from "../types"

export class Stash {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    public get = async (stackid: string, params?: {mature_content: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/stash/${stackid}`, {stackid, params})
        return result as Promise<DeviantArtStash>
    }

    public item = async (itemid: string, params?: {ext_submission: boolean, ext_camera: boolean, ext_stats: boolean, mature_content: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/stash/item/${itemid}`, {params})
        return result as Promise<DeviantArtStashItem>
    }
}
