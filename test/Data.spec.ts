import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Data", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get countries", async function() {
        const result = await deviantArt.data.countries()
        assert(result.hasOwnProperty("results"))
    })

    it("should get the privacy policy", async function() {
        const result = await deviantArt.data.privacy()
        assert(result.hasOwnProperty("text"))
    })

    it("should get submission guidelines", async function() {
        const result = await deviantArt.data.submission()
        assert(result.hasOwnProperty("text"))
    })

    it("should get terms of service", async function() {
        const result = await deviantArt.data.tos()
        assert(result.hasOwnProperty("text"))
    })
})
