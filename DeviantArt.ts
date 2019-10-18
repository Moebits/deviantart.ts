import api from "./api/api"
import {Browse, Collections, Comments, Curated, Data, Deviation, Gallery, RSS, Stash, User, Util} from "./endpoints/index"
import {DeviantArtAuth, DeviantArtCategoryTree, DeviantArtComment, DeviantArtCommentContext, DeviantArtCommentSearch,
DeviantArtCurated, DeviantArtCuratedTags, DeviantArtDeviation, DeviantArtFolders, DeviantArtMoreLikeThisPreview, DeviantArtQueryResults,
DeviantArtSearchResults, DeviantArtStash, DeviantArtStashItem, DeviantArtStatus, DeviantArtUser, DeviantArtUserFriends, DeviantArtUserProfile,
DeviantArtUserStatuses, DeviantArtWatchers, DeviationContent, DeviationDownload, DeviationEmbeddedContent, DeviationImageRSS, DeviationMetaData,
DeviationRSS, DeviationThumbnailRSS, DeviationWhoFaved} from "./types/index"

/**
 * This is the main class for interacting with the DeviantArt API.
 */
export default class DeviantArt {
    public static accessToken: string
    public rss =  new RSS(DeviantArt.accessToken)
    public deviation = new Deviation(DeviantArt.accessToken)
    public user = new User(DeviantArt.accessToken)
    public gallery = new Gallery(DeviantArt.accessToken)
    public util = new Util(DeviantArt.accessToken)
    public browse = new Browse(DeviantArt.accessToken)
    public curated = new Curated(DeviantArt.accessToken)
    public data = new Data(DeviantArt.accessToken)
    public collections = new Collections(DeviantArt.accessToken)
    public stash = new Stash(DeviantArt.accessToken)
    public comments = new Comments(DeviantArt.accessToken)
    public api = new api(DeviantArt.accessToken)

    private constructor() {}

    /**
     * Logs into the DeviantArt API with your client id and token, and retrieves your access token.
     * @returns An instance of the DeviantArt Class.
     */
    public static login = async (clientId: string, clientSecret: string) => {
        if (!clientId || !clientSecret) {
            const missing = clientId ? "clientSecret" : "clientId"
            return Promise.reject(`You must provide a ${missing}. You can get these
            credentials by registering an application at https://www.deviantart.com/developers/`)
        }
        const auth = await api.getNoLogin("oauth2/token", {grant_type: "client_credentials", client_id: clientId, client_secret: clientSecret}) as DeviantArtAuth
        DeviantArt.accessToken = auth.access_token
        return new DeviantArt()
    }

    /**
     * Finds a deviation from it's URL by iterating through all of the user's
     * submitted illustrations. While slow if the user has a lot of deviations, with
     * this function you can easily get a deviation's id.
     */
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

module.exports.default = DeviantArt
export {DeviantArtAuth, DeviantArtCategoryTree, DeviantArtComment, DeviantArtCommentContext, DeviantArtCommentSearch,
DeviantArtCurated, DeviantArtCuratedTags, DeviantArtDeviation, DeviantArtFolders, DeviantArtMoreLikeThisPreview, DeviantArtQueryResults,
DeviantArtSearchResults, DeviantArtStash, DeviantArtStashItem, DeviantArtStatus, DeviantArtUser, DeviantArtUserFriends, DeviantArtUserProfile,
DeviantArtUserStatuses, DeviantArtWatchers, DeviationContent, DeviationDownload, DeviationEmbeddedContent, DeviationImageRSS, DeviationMetaData,
DeviationRSS, DeviationThumbnailRSS, DeviationWhoFaved} from "./types/index"
export {Browse, Collections, Comments, Curated, Data, Deviation, Gallery, RSS, Stash, User, Util} from "./endpoints/index"
