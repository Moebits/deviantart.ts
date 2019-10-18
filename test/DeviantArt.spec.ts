import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("DeviantArt", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get a deviation from the api by URL.", async function() {
        const result = await deviantArt.findByIteration("https://www.deviantart.com/shouu-kun/art/Sagiri-680420718")
        assert(result.hasOwnProperty("deviationid"))
    })

    it("should extend API Deviations", async function() {
        const result = await deviantArt.deviation.get({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        const extended = await deviantArt.extendDeviations([result])
        assert(extended[0].hasOwnProperty("description"))
    })

    it("should extend RSS Deviations", async function() {
        const result = await deviantArt.rss.search("anime", 10, "popular")
        const extended = await deviantArt.extendRSSDeviations(result)
        assert(extended[0].author.hasOwnProperty("profile_pic"))
    })

})
