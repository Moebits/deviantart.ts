import DeviantArt from "../deviantart"

require("dotenv").config()
let deviantArt: DeviantArt

export default async () => {
    if (!deviantArt) {
        deviantArt = await DeviantArt.login(process.env.DEVIANTART_CLIENT_ID, process.env.DEVIANTART_CLIENT_SECRET)
    }
}

export {deviantArt}
