import {assert} from "chai"
import "mocha"

import login, {deviantArt} from "./login"

describe("User", async function() {
    this.beforeAll(async function() {
        await login()
    })

    it("should get friends", async function() {
        const result = await deviantArt.user.friends({username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })

    it("should search friends", async function() {
        const result = await deviantArt.user.friendsSearch({query: "cool", username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get a profile", async function() {
        const result = await deviantArt.user.profile({username: "fhilippe124"})
        assert(result.hasOwnProperty("bio"))
    })

    it("should get a status", async function() {
        const result = await deviantArt.user.status({statusid: "D3823052-6164-5685-1A5E-CE08705CA878"})
        assert(result.hasOwnProperty("is_deleted"))
    })

    it("should get statuses", async function() {
        const result = await deviantArt.user.statuses({username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })

    it("should get watchers", async function() {
        const result = await deviantArt.user.watchers({username: "fhilippe124"})
        assert(result.hasOwnProperty("results"))
    })
})
