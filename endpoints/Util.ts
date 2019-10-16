import api from "../api/api"

export class Util {
    constructor(private readonly accessToken) {}

    public placebo = async (params?: {mature_content: boolean}) => {
        const result = await api.get(`api/v1/oauth2/placebo`, {params, access_token: this.accessToken})
        return result as Promise<{status: string}>
    }
}
