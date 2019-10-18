import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("RSS", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get from a URL", async function() {
        const result = await deviantArt.rss.get("https://www.deviantart.com/fhilippe124/art/Sagiri-Izumi-Eromanga-sensei-fanart-678288299")
        assert(result.hasOwnProperty("title"))
    })

    it("should get from a search query", async function() {
        const result = await deviantArt.rss.get("anime")
        assert(result.hasOwnProperty("title"))
    })

    it("should work with a search", async function() {
        const result = await deviantArt.rss.search("anime", 10, "deviation")
        assert(result[0].hasOwnProperty("title"))
    })
})
