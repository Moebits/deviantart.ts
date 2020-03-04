import DeviantArt from "./deviantart"

require("dotenv").config();

/**
 * @ignore
 */
(async () => {
    const deviantArt = await DeviantArt.login(process.env.DEVIANTART_CLIENT_ID, process.env.DEVIANTART_CLIENT_SECRET)
    // const result = await deviantArt.findByIteration("https://www.deviantart.com/shouu-kun/art/Sagiri-680420718")
    // const result = await deviantArt.comments.deviation("1FA35A6D-E2CD-3CDF-1A65-410AB577BF10")
    // const result = await deviantArt.comments.siblings("FE5A83B8-0495-9E1D-3A54-864D943D579C")
    // const result = await deviantArt.collections.folders({username: "fhilippe124"})
    const result = await deviantArt.collections.get({folderid: "79216EF7-CED7-6973-DD90-6793348AD2A4", username: "fhilippe124"})
    // const result = await deviantArt.rss.get("Eromanga Sensei")
    const result2 = await deviantArt.extendDeviations(result.results)
    console.log(result2)
})()
