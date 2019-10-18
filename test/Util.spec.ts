import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Util", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get the access token status", async function() {
        const result = await deviantArt.util.placebo()
        assert(result.hasOwnProperty("status"))
    })
})
