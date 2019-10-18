import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Comments", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get a deviations comments", async function() {
        const result = await deviantArt.comments.deviation({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        assert(result.hasOwnProperty("thread"))
    })

    it("should get comment replies", async function() {
        const result = await deviantArt.comments.siblings({commentid: "FE5A83B8-0495-9E1D-3A54-864D943D579C"})
        assert(result.hasOwnProperty("thread"))
    })

    it("should get comments on a profile", async function() {
        const result = await deviantArt.comments.profile({username: "fhilippe124"})
        assert(result.hasOwnProperty("thread"))
    })

    it("should get comments on a status", async function() {
        const result = await deviantArt.comments.status({statusid: "D3823052-6164-5685-1A5E-CE08705CA878"})
        assert(result.hasOwnProperty("thread"))
    })
})
