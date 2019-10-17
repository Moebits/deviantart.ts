import api from "./api/api"
import {Browse, Collections, Comments, Curated, Data, Deviation, Gallery, RSS, Stash, User, Util} from "./endpoints"
import {DeviantArtAuth, DeviantArtDeviation} from "./types"

export default class DeviantArt {
    public accessToken: string
    public rss =  new RSS(this.accessToken)
    public deviation = new Deviation(this.accessToken)
    public user = new User(this.accessToken)
    public gallery = new Gallery(this.accessToken)
    public util = new Util(this.accessToken)
    public browse = new Browse(this.accessToken)
    public curated = new Curated(this.accessToken)
    public data = new Data(this.accessToken)
    public collections = new Collections(this.accessToken)
    public stash = new Stash(this.accessToken)
    public comments = new Comments(this.accessToken)
    public api = new api(this.accessToken)
    constructor(private clientId?: string, private clientSecret?: string) {}

    private readonly verifyAuth =  async () => {
        if (!this.clientId || !this.clientSecret) {
            const missing = this.clientId ? "clientSecret" : "clientId"
            return Promise.reject(`You must provide a ${missing}. You can get these
            credentials by registering an application at https://www.deviantart.com/developers/`)
        }
        if (!this.accessToken) return false
        const placebo = await api.getNoLogin("api/v1/oauth2/placebo", {access_token: this.accessToken})
        return placebo.status === "success" ? true : false
    }

    public login = async (clientId?: string, clientSecret?: string) => {
        if (clientId) this.clientId = clientId
        if (clientSecret) this.clientSecret = clientSecret
        if (!await this.verifyAuth()) {
            const auth = await api.getNoLogin("oauth2/token", {grant_type: "client_credentials", client_id: this.clientId, client_secret: this.clientSecret}) as DeviantArtAuth
            this.accessToken = auth.access_token
        }
        this.rss = new RSS(this.accessToken)
        this.deviation = new Deviation(this.accessToken)
        this.gallery = new Gallery(this.accessToken)
        this.util = new Util(this.accessToken)
        this.user = new User(this.accessToken)
        this.browse = new Browse(this.accessToken)
        this.curated = new Curated(this.accessToken)
        this.data = new Data(this.accessToken)
        this.collections = new Collections(this.accessToken)
        this.stash = new Stash(this.accessToken)
        this.comments = new Comments(this.accessToken)
        this.api = new api(this.accessToken)
    }

    public findByIteration = async (deviationUrl: string): Promise<DeviantArtDeviation> => {
        let offset = 0
        if (deviationUrl.match(/(?<=art\/)(.*?)(?=\d{5})/g)) {
            const title = deviationUrl.match(/(?<=art\/)(.*?)(?=\d{5})/g)![0]
            const user = deviationUrl.match(/(?<=com\/)(.*?)(?=\/art)/g)![0]
            const iterate = async (username: string) => {
                const result = await this.gallery.all({username, offset, limit: 24})
                if (!result.results[0]) {
                    return Promise.reject("No results were found.")
                }
                for (let i = 0; i < result.results.length; i++) {
                    const deviation = result.results[i]
                    const cleanUrl = deviation.url.match(/(?<=art\/)(.*?)(?=\d{5})/g)![0]
                    console.log(cleanUrl)
                    if (cleanUrl.includes(title)) {
                        return deviation
                    }
                }
                offset += 24
                return iterate(user)
            }
            return iterate(user)
        } else {
            return Promise.reject("The url is invalid.")
        }
    }
}

export * from "./types/RSSTypes"
export * from "./types/ApiTypes"
