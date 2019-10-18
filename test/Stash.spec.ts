import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Stash", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get a stash", async function() {
        const result = await deviantArt.stash.get({stackid: ""})
        assert(result.hasOwnProperty("title"))
    })

    it("should get an item", async function() {
        const result = await deviantArt.stash.item({itemid: ""})
        assert(result.hasOwnProperty("title"))
    })
})
