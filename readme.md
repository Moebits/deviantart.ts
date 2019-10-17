![DeviantArt.ts](../deviantart.ts/images/deviantart.tslogo.gif)

[![NPM](https://nodei.co/npm/deviantart.ts.png)](https://nodei.co/npm/deviantart.ts/)

###About
This is a wrapper for the DeviantArt API that covers all of the public endpoints, includes typings, and various utility functions to make finding deviations easier. 

###Insall
```ts
npm install deviantart.ts
```

###Getting Started
Register an app at [**DeviantArt Developers**](https://www.deviantart.com/developers/) in order to receive a **client id** and a **client secret**. You will need these credentials in order to receive an **access token** from the DeviantArt API. Read the official api [**documentation**](https://www.deviantart.com/developers/http/v1/20160316) for information on all of the endpoints, the parameters that they take, and the responses that they send. This library only covers the client credentials endpoints.

#####Searching for Deviations
```ts
import DeviantArt from "deviantart.ts"

/*Replace with your credentials. I recommend storing them 
in environmental variables*/
const deviantArt = new DeviantArt(process.env.DEVIANTART_CLIENT_ID, process.env.DEVIANTART_CLIENT_SECRET)

//All API methods return a Promise.
async function useAPI() {
    /*You must login in order to obtain your access
    token, or else your api requests will
    be rejected.*/
    await deviantArt.login()

    /*It is much, much faster to use the RSS API.
    This gets a single deviation by URL or by query.*/
    const deviation = await deviantArt.rss.get("https://www.deviantart.com/fhilippe124/art/Sagiri-Izumi-Eromanga-sensei-fanart-678288299")

    /*To search for multiple, use search instead.
    The second parameter is the limit.*/
    const deviations = await deviantArt.rss.search("Eromanga Sensei", 50)

    /*The painfully slow alternative using the
    regular API is to iterate through all of a user's
    deviations to find the one that matches the URL.
    But you can only get the deviation id through
    the api, so use this instead if you need it.*/
    const verySlow = await deviantArt.findByIteration("https://www.deviantart.com/fhilippe124/art/Yamada-Elf-Eromanga-sensei-fanart-678701561")

    /*The browse endpoint offers popular, newest, hot,
    undiscovered, etc. searches.*/
    const popular = await deviantArt.browse.popular({q: "anime"})
    const hot = await deviantArt.browse.hot({category: "manga"})
    //The date is in yyyy-mm-dd format!
    const daily = await deviantArt.browse.dailyDeviations({date: 2019-07-03})

    /*In order to use the deviation endpoint, you must 
    have the deviation id. In this case, findByIteration()
    is very useful.*/
    const deviationDetails = await deviantArt.deviation.get("1FA35A6D-E2CD-3CDF-1A65-410AB577BF10")

}
useAPI()
```