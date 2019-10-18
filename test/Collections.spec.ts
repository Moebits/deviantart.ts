import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("Collections", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get all user folders", async function() {
        const result = await deviantArt.collections.folders({username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get all all deviations in a collection", async function() {
        const result = await deviantArt.collections.get({folderid: "79216EF7-CED7-6973-DD90-6793348AD2A4", username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })

})
