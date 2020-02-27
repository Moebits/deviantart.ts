import axios, {AxiosRequestConfig} from "axios"
import {Html5Entities} from "html-entities"
import {parseStringPromise} from "xml2js"
import {ParsedURL} from "./../types/ApiTypes"
import {DeviationRSS} from "./../types/RSSTypes"

const apiURL = "https://www.deviantart.com/"
const rssUrl = "https://backend.deviantart.com/rss.xml"

export default class Api {
    constructor(private readonly accessToken: string) {}

    /**
     * Gets an endpoint from the DeviantArt api.
     */
    public get = async (endpoint: string, params: any) => {
        params = params.params ? params.params : params
        params.access_token = this.accessToken
        const url = apiURL + endpoint
        const result = await axios.get(url, {params} as AxiosRequestConfig).then((r) => r.data)
        return result
    }

    /**
     * Used internally to get the access token in [[login]]
     */
    public static getNoLogin = async (endpoint: string, params: any) => {
        const url = apiURL + endpoint
        const result = await axios.get(url, {params}).then((r) => r.data)
        return result
    }

    /**
     * Parses the title, user, and numeric id from a url.
     */
    public static parseUrl = (url: string): ParsedURL => {
        let title = url.match(/(?<=art\/)(.*?)(?=\d{5})/g) ? url.match(/(?<=art\/)(.*?)(?=\d{5})/)[0].replace(/-/g, " ") : null
        const user = url.match(/(?<=com\/)(.*?)(?=\/art)/g) ? url.match(/(?<=com\/)(.*?)(?=\/art)/)[0] : null
        const id = url.match(/\d{5,}/) ? url.match(/\d{5,}/)[0] : null
        if (title) {
            title = title.replace(/\d+/, "").trim()
        }
        return {title, user, id}
    }

    /**
     * Fetches xml from the RSS api and converts it to json.
     */
    public static getRSS = async (params: any, limit?: number) => {
        const xml = await axios.get(rssUrl, {params}).then((r) => r.data)
        const json = await parseStringPromise(xml).then((r) => r.rss.channel[0] ? r.rss.channel[0].item : null)
        if (!json || !json[0]) return Promise.reject("No search results.")
        limit = limit ? limit : json.length
        const jsonArray = []
        for (let i = 0; i < limit; i++) {
            jsonArray.push(json[i])
        }
        return jsonArray.filter(Boolean)
    }

    /**
     * Cleans html by stripping tags and entities.
     */
    public static cleanHTML = (str: string) => {
        if (!str) return ""
        const replaced = str.replace(/<[^>]*>?/gm, "")
        .replace(/(\\')/g, "'")
        const html = new Html5Entities()
        return html.decode(replaced)
    }

    /**
     * Formats the raw json received to a more friendly version.
     */
    public static formatJSON = (json: string): DeviationRSS => {
        const parsed = JSON.parse(json)
        const title = parsed["media:title"] ? parsed["media:title"][0]._ : null
        const url = parsed.link ? parsed.link[0] : null
        const date = parsed.pubDate ? parsed.pubDate[0] : null
        const rating = parsed["media:rating"] ? parsed["media:rating"][0] : null
        const category = parsed["media:category"] ? parsed["media:category"][0].$.label : null
        const categoryPath = parsed["media:category"] ? parsed["media:category"][0]._ : null
        const keywords = parsed["media:keywords"]
        const author = parsed["media:credit"] ? parsed["media:credit"][0]._ : null
        const copyright = parsed["media:copyright"] ? parsed["media:copyright"][0]._ : null
        const description = parsed["media:description"][0] ? Api.cleanHTML(parsed["media:description"][0]._) : null
        const thumbnails = []
        if (parsed["media:thumbnail"]) {
            for (let i = 0; i < parsed["media:thumbnail"].length; i++) {
                thumbnails.push(parsed["media:thumbnail"][i].$)
            }
        }
        const content = []
        if (parsed["media:content"]) {
            for (let i = 0; i < parsed["media:content"].length; i++) {
                content.push(parsed["media:content"][i].$)
            }
        }
        return {
            title, url, date, rating, category, categoryPath, keywords, author, copyright, description, thumbnails, content
        }
    }
}
