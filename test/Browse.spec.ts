import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Browse", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get category paths", async function() {
        const result = await deviantArt.browse.categoryTree({catpath: "/"})
        assert(result.hasOwnProperty("categories"))
    })

    it("should get daily deviations", async function() {
        const result = await deviantArt.browse.daily({date: "2019-07-03", expand: "user.watch", mature_content: true})
        assert(result.hasOwnProperty("results"))
    })

    it("should get hot deviations", async function() {
        const result = await deviantArt.browse.hot({category_path: "/digitalart", offset: 1, limit: 20, mature_content: true})
        assert(result.hasOwnProperty("results"))
    })

    it("should get more like this", async function() {
        const result = await deviantArt.browse.moreLikeThis({seed: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get more like this previews", async function() {
        const result = await deviantArt.browse.moreLikeThisPreview({seed: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
        assert(result.hasOwnProperty("author"))
    })

    it("should get newest deviations", async function() {
        const result = await deviantArt.browse.newest({q: "anime"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get popular deviations", async function() {
        const result = await deviantArt.browse.popular({q: "anime"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get deviations from a tag", async function() {
        const result = await deviantArt.browse.tag({tag: "kawaii"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get tag searches", async function() {
        const result = await deviantArt.browse.tagSearch({tag_name: "cute"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get undiscovered deviations", async function() {
        const result = await deviantArt.browse.undiscovered()
        assert(result.hasOwnProperty("results"))
    })

    it("should get user journals", async function() {
        const result = await deviantArt.browse.userJournals({username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })
})
