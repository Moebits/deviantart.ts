import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Gallery", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get all deviations of a user", async function() {
        const result = await deviantArt.gallery.all({username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get all folders of a user", async function() {
        const result = await deviantArt.gallery.folders({username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get a folder", async function() {
        const result = await deviantArt.gallery.get({folderid: "79216EF7-CED7-6973-DD90-6793348AD2A4", username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })
})
