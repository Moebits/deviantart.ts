import DeviantArt from "./DeviantArt"

require("dotenv").config()
const deviantArt = new DeviantArt(process.env.DEVIANTART_CLIENT_ID, process.env.DEVIANTART_CLIENT_SECRET);

(async () => {
    // 79F1C5A9-B0F6-6704-54A6-1A7899D45277
    // const result = await deviantArt.rss.get("https://www.deviantart.com/shouu-kun/art/Sagiri-680420718")
    const result = await deviantArt.browse.popular()
    console.log(result)
})()
