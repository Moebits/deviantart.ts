import DeviantArt from "./deviantart"

require("dotenv").config();

/**
 * @ignore
 */
(async () => {
    const deviantArt = await DeviantArt.login(process.env.DEVIANTART_CLIENT_ID, process.env.DEVIANTART_CLIENT_SECRET)
    const result = await deviantArt.rss.get("Eromanga Sensei")
    console.log(result)
})()
