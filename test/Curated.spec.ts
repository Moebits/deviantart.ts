import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Curated", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get featured tags", async function() {
        const result = await deviantArt.curated.tags()
        assert(result.hasOwnProperty("results"))
    })
})
