import api from "../api/api"

export class Util {
    private readonly api = new api(this.accessToken)
    constructor(private readonly accessToken) {}

    public placebo = async (params?: {mature_content: boolean}) => {
        const result = await this.api.get(`api/v1/oauth2/placebo`, {params})
        return result as Promise<{status: string}>
    }
}
