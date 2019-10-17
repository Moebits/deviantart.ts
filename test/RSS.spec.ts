import {assert} from "chai"
import "mocha"
import DeviantArt from "../DeviantArt"

require("dotenv").config()
const deviantArt = new DeviantArt(process.env.DEVIANTART_CLIENT_ID, process.env.DEVIANTART_CLIENT_SECRET)

describe("RSS", async function() {
    this.beforeAll(async function() {
        await deviantArt.login()
    })

    it("should get from a URL", async function() {
        const result = await deviantArt.rss.get("https://www.deviantart.com/rkasai14/art/Eromanga-sensei-3V-3-4--716752756")
        assert(result.hasOwnProperty("thumbnails"))
    })

    it("should get from a search query", async function() {
        const result = await deviantArt.rss.get("Eromanga Sensei")
        assert(result.hasOwnProperty("thumbails"))
    })

    it("should work with a search", async function() {
        const result = await deviantArt.rss.search("anime", 10, "deviation")
        assert(result[0].hasOwnProperty("thumbnails"))
    })
})
