import api from "../api/api"
import {DeviationRSS} from "./../types/RSSTypes"

export class RSS {
    constructor(private readonly accessToken: string) {}

    public get = async (deviationURL: string) => {
        const deviantInfo = await api.parseUrl(deviationURL)
        const json = await api.rssGet({q: deviantInfo.title, type: "deviation", access_token: this.accessToken}, 100)
        const parsed: DeviationRSS[] = []
        for (let i = 0; i < json.length; i++) {
            parsed.push(api.formatJSON(JSON.stringify(json[i])))
            if (parsed[i].author.toLowerCase() === deviantInfo.user) {
                return parsed[i]
            }
        }
        return Promise.reject("No results were found, the URL is invalid.")
    }

    public search = async (query: string, limit?: number, type?: string) => {
        if (!limit) limit = 50
        const json = await api.rssGet({q: query, type, access_token: this.accessToken}, limit)
        const parsed: DeviationRSS[] = []
        for (let i = 0; i < json.length; i++) {
            parsed.push(api.formatJSON(JSON.stringify(json[i])))
        }
        if (!parsed[0]) return Promise.reject("No results were found, try searching for another tag.")
        return parsed
    }
}
