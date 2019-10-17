import DeviantArt from "./DeviantArt"

require("dotenv").config()
const deviantArt = new DeviantArt(process.env.DEVIANTART_CLIENT_ID, process.env.DEVIANTART_CLIENT_SECRET);

(async () => {
    await deviantArt.login()
    const result = await deviantArt.findByIteration("https://www.deviantart.com/shouu-kun/art/Sagiri-680420718")
    return result
})()
