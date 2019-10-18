import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Deviation", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get a deviation", async function() {
        const result = await deviantArt.deviation.get({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        assert(result.hasOwnProperty("printid"))
    })

    it("should get a deviation's content", async function() {
        const result = await deviantArt.deviation.content({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        assert(result.hasOwnProperty("html"))
    })

    it("should get the file download", async function() {
        const result = await deviantArt.deviation.download({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        assert(result.hasOwnProperty("filesize"))
    })

    it("should get embedded content", async function() {
        const result = await deviantArt.deviation.embeddedContent({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get metadata", async function() {
        const result = await deviantArt.deviation.metaData({deviationids: ["1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"]})
        assert(result.hasOwnProperty("metadata"))
    })

    it("should get who faved", async function() {
        const result = await deviantArt.deviation.whoFaved({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        assert(result.hasOwnProperty("results"))
    })
})
