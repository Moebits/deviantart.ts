import api from "../api/api"
import {DeviantArtStash, DeviantArtStashItem} from "../types/index"

export class Stash {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken: string) {}

    /**
     * Fetches a stash from its stack id.
     */
    public get = async (params: {stackid: string, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/stash/${params.stackid}`, {params})
        return result as Promise<DeviantArtStash>
    }

    /**
     * Fetches an item using its item id.
     */
    public item = async (params: {itemid: string, ext_submission?: boolean, ext_camera?: boolean, ext_stats?: boolean, mature_content?: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/stash/item/${params.itemid}`, {params})
        return result as Promise<DeviantArtStashItem>
    }
}
