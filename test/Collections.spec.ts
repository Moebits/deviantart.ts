import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe.only("Browse", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get all user folders", async function() {
        const result = await deviantArt.collections.folders({username: "fhilippe124"})
        console.log(result)
        assert(result.hasOwnProperty("results"))
    })

})
