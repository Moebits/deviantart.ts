import api from "./api/api"
import {Browse, Deviation, Gallery, RSS, User, Util} from "./endpoints"
import {DeviantArtAuth} from "./types/ApiTypes"

export default class DeviantArt<A extends string | undefined> {
    public accessToken: string
    public rss = new RSS(this.accessToken)
    public deviation = new Deviation(this.accessToken)
    public user = new User(this.accessToken)
    public gallery = new Gallery(this.accessToken)
    public util = new Util(this.accessToken)
    public browse = new Browse(this.accessToken)
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
            this.accessToken = auth.access_token as A
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
