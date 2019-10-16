import api from "./api/api"
import {Deviation, Gallery, RSS, User, Util} from "./endpoints"
import {DeviantArtAuth} from "./types/ApiTypes"

export default class DeviantArt {
    public accessToken: string
    public rss: RSS
    public deviation: Deviation
    public user: User
    public gallery: Gallery
    public util: Util
    constructor(private clientId?: string, private clientSecret?: string) {}

    private readonly verifyAuth =  async () => {
        if (!this.clientId || !this.clientSecret) {
            const missing = this.clientId ? "clientSecret" : "clientId"
            return Promise.reject(`You must provide a ${missing}. You can get these
            credentials by registering an application at https://www.deviantart.com/developers/`)
        }
        if (!this.accessToken) return false
        const placebo = await api.get("api/v1/oauth2/placebo", {access_token: this.accessToken})
        return placebo.status === "success" ? true : false
    }

    public login = async (clientId?: string, clientSecret?: string) => {
        if (clientId) this.clientId = clientId
        if (clientSecret) this.clientSecret = clientSecret
        if (!await this.verifyAuth()) {
            const auth = await api.get("oauth2/token", {grant_type: "client_credentials", client_id: this.clientId, client_secret: this.clientSecret}) as DeviantArtAuth
            this.accessToken = auth.access_token
        }
        this.rss = new RSS(this.accessToken)
        this.deviation = new Deviation(this.accessToken)
        this.gallery = new Gallery(this.accessToken)
        this.user = new User(this.accessToken)
        return this.accessToken
    }
}

export * from "./types/RSSTypes"
export * from "./types/ApiTypes"
