import api from "../api/api"
import {DeviationRSS} from "./../types"

export class RSS {
    constructor(private readonly accessToken: string) {}

    public get = async (deviationURL: string): Promise<DeviationRSS> => {
        const deviantInfo = await api.parseUrl(deviationURL)
        if (!deviantInfo.title) {
            const jsonQuery = await api.getRSS({q: deviationURL, type: "deviation", access_token: this.accessToken}, 1)
            if (jsonQuery[0]) return api.formatJSON(JSON.stringify(jsonQuery[0]))
            return Promise.reject("No results were found, try searching with another query.")
        }
        const query = `by:${deviantInfo.user}+${deviantInfo.title.trim()}+sort:Apopular`
        const json = await api.getRSS({q: query, type: "deviation", access_token: this.accessToken}, 1000)
        const parsed: DeviationRSS[] = []
        for (let i = 0; i < json.length; i++) {
            parsed.push(api.formatJSON(JSON.stringify(json[i])))
            if (parsed[i].url.includes(deviationURL.trim())) {
                return parsed[i]
            }
        }
        return Promise.reject("No results were found. The URL is invalid.")
    }

    public search = async (query: string, limit?: number, sort?: string): Promise<DeviationRSS[]> => {
        switch (sort) {
            case "popular":
                sort = "+sort:Apopular"
            case "newest":
                sort = "+sort:Atime"
            default:
                sort = ""
        }
        if (!limit) limit = 50
        const json = await api.getRSS({q: query + sort, type: "deviation", access_token: this.accessToken}, limit)
        const parsed: DeviationRSS[] = []
        for (let i = 0; i < json.length; i++) {
            parsed.push(api.formatJSON(JSON.stringify(json[i])))
        }
        if (!parsed[0]) return Promise.reject("No results were found, try searching for another tag.")
        return parsed
    }
}
