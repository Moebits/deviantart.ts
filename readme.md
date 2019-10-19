<div align="left">
  <p>
    <a href="https://tenpi.github.io/deviantart.ts/"><img src="https://raw.githubusercontent.com/Tenpi/deviantart.ts/master/images/deviantart.tslogo.gif" width="500" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/deviantart.ts/"><img src="https://nodei.co/npm/deviantart.ts.png" /></a>
  </p>
</div>

### About
This is a wrapper for the DeviantArt API that covers all of the public endpoints, includes typings, and various utility functions to make finding deviations easier. 

### Insall
```ts
npm install deviantart.ts
```

### Getting Started
Register an app at [**DeviantArt Developers**](https://www.deviantart.com/developers/) in order to receive a **client id** and a **client secret**. You will need these credentials in order to receive an **access token** from the DeviantArt API. Read the official api [**documentation**](https://www.deviantart.com/developers/http/v1/20160316) for information on all of the endpoints, the parameters that they take, and the responses that they send. This library only covers the client credentials endpoints.

### Useful Links

- [**Official DeviantArt Documentation**](https://www.deviantart.com/developers/http/v1/20160316)
- [**DeviantArt.ts Documentation**](https://tenpi.github.io/deviantart.ts/)

#### Searching for Deviations
```ts
import DeviantArt from "deviantart.ts"

async function useAPI() {
    /*Since all API calls return a Promise, we must instantiate the class using an asynchronous method. Don't use
    the constructor, all of the properties will be undefined!*/
    const deviantArt = await DeviantArt.login(process.env.DEVIANTART_CLIENT_ID, process.env.DEVIANTART_CLIENT_SECRET)

    /*It is much, much faster to use the RSS API.
    This gets a single deviation by URL or by query.*/
    const deviation = await deviantArt.rss.get("https://www.deviantart.com/fhilippe124/art/Sagiri-Izumi-Eromanga-sensei-fanart-678288299")

    /*To search for multiple, use search instead. The second parameter is 
    the limit, the third is the sort method ("popular" or "newest").*/
    const deviations = await deviantArt.rss.search("Eromanga Sensei", 50, "popular")

    /*The painfully slow alternative using the regular API is to 
    iterate through all of a user's deviations to find the one that matches the URL.
    But you can only get the deviation id through the api, so use this instead if you need it.*/
    const verySlow = await deviantArt.findByIteration("https://www.deviantart.com/fhilippe124/art/Yamada-Elf-Eromanga-sensei-fanart-678701561")

    /*The browse endpoint offers searches for popular, newest, hot, undiscovered, etc. deviations.*/
    const popular = await deviantArt.browse.popular({q: "anime"})
    const hot = await deviantArt.browse.hot({category_path: "manga"})
    //The date is in yyyy-mm-dd format!
    const daily = await deviantArt.browse.daily({date: 2019-07-03})
    const tag = await deviantArt.browse.tag({tag: "cute"})
    const undiscovered = await deviantArt.browse.undiscovered({mature_content: true})

    /*In order to use the deviation endpoint, you must 
    have the deviation id. In this case, findByIteration()
    is very useful.*/
    const deviationByID = await deviantArt.deviation.get({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})

    /*The moreLikeThis endpoint takes a deviationid (which is called a seed in the api for some reason).*/
    const moreLikeThis = await deviantArt.browse.moreLikeThis({seed: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})

}
useAPI()
```
#### Searching for Users and Folders
```ts
async function useAPI() {
    /*Search for a user's profile*/
    const user = await deviantArt.user.get({username: "tenpii"})

    /*Get all of a user's deviations.*/
    const userDeviations = await deviantArt.gallery.all({username: "tenpii"})

    /*Get all of their statuses*/
    const statuses = await deviantArt.user.statuses({username: "tenpii"})

    /*Get all of their profile comments*/
    const profileComments = await deviantArt.comments.profile({username: "tenpii"})

    /*Get all of a user's folders*/
    const folders = await deviantArt.collections.folders({username: "fhilippe124"})

    /*Get all deviations in the folder. You must have the folder id, which you can get from the api call above.
    The username parameter is only optional if you are searching your own folders.*/
    const folderDeviations = await deviantArt.collections.get({folderid: "79216EF7-CED7-6973-DD90-6793348AD2A4", username: "fhilippe124"})
}
```
#### Searching for Comments and Tags
```ts
async function useAPI() {
    /*Note that the deviation id is required for this endpoint.*/
    const comments = await deviantArt.comments.deviation({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})

    /*To get sibling comments, you must have the comment id, which you can get from the api call above.*/
    const userDeviations = await deviantArt.comments.siblings({commentid: "FE5A83B8-0495-9E1D-3A54-864D943D579C"})

    /*To search for tags, you can use the browse endpoint.*/
    const tagSearch = await deviantArt.browse.tagSearch({tag_name: "kawaii"})
}
```
#### Other endpoints and parameters
There are many more less commonly used endpoints such as **Curated**, **Stash**, and **Data**. For a more complete documentation please read the [**api documentation**](https://www.deviantart.com/developers/http/v1/20160316) on DeviantArt.
##### Common Parameters:
- `mature_content` - set to true to include mature results.
- `expand` - Expands the response objects, such as including `user.details` in a `DeviantArtUser` object. You may need to use type assertions if you use.
- `offset` - Returns results starting from the offset
- `limit` - Returns a certain amount of results
- `deviationid` - The deviation id. All id's look like: `1FA35A6D-E2CD-3CDF-1A65-410AB577BF10`.
- `userid` - The user id. 
- `commentid` - The comment id. 
- `folderid` - The folder id.
- `statusid` - The status id.
- `category_path` - The category path to search.
- `q` - The query to search.
- `timerange` - Timerange to search Ex. `(8hr, 5days, 2weeks, alltime)`
- `date` - The date in `yyyy-mm-dd` format

#### Common Types
<details>
<summary>DeviantArtDeviation</summary>
    
```ts
export interface DeviantArtDeviation {
    deviationid: string
    printid: string | null
    url?: string
    title?: string
    category?: string
    category_path?: string
    is_favourited?: boolean
    is_deleted?: boolean
    author?: DeviantArtUser
    stats?: {
        comments: number
        favourites: number
    }
    published_time?: string
    allows_comments?: boolean
    preview?: {
        src: string
        height: number
        width: number
        transparency: boolean
    }
    content?: {
        src: string
        height: number
        width: number
        transparency: boolean
        filesize: number
    }
    thumbs?: Array<{
        src: string
        height: number
        width: number
        transparency: boolean
    }>
    videos?: Array<{
        src: string
        quality: string
        filesize: number
        duration: number
    }>
    flash?: {
        src: string
        height: number
        width: number
    }
    daily_deviation?: {
        body: string
        time: string
        giver: DeviantArtUser
        suggester?: DeviantArtUser
    }
    excerpt?: string
    is_mature?: boolean
    is_downloadable?: boolean
    download_filesize?: number
    challenge?: {
        type: string[]
        completed: boolean
        tags: string[]
        locked?: boolean
        credit_deviation: string | null
        media: string[]
        level_label?: string
        time_limit?: number
        levels?: string[]
    }
    challenge_entry?: {
        challengeid: string
        challenge_title: string
        challenge?: DeviantArtDeviation
        timed_duration: number
        submission_time: string
    }
    motion_book?: {
        embed_url: string
    }
}
```
</details>

<details>
<summary>DeviantArtUser</summary>
    
```ts
export interface DeviantArtUser {
    userid: string
    username: string
    usericon: string
    type: string
    is_watching?: boolean
    details?: {
        sex: string | null
        age: number | null
        joinDate: string
    }
    geo?: {
        country: string
        countryid: number
        timezone: string
    }
    profile?: {
        user_is_artist: boolean
        artist_level: string | null
        artist_specialty: string | null
        real_name: string
        tagline: string
        website: string
        cover_photo: string
        profile_pic: DeviantArtDeviation
    }
    stats?: {
        watchers: number
        friends: number
    }
}
```
</details>

<details>
<summary>DeviantArtUserProfile</summary>

```ts
export interface DeviantArtUserProfile {
    user: DeviantArtUser
    is_watching: boolean
    profile_url: string
    user_is_artist: boolean
    artist_level: string | null
    artist_specialty: string | null
    real_name: string
    tagline: string
    countryid: number
    country: string
    website: string
    bio: string
    cover_photo: string | null
    profile_pic: DeviantArtDeviation | null
    last_status: DeviantArtStatus | null
    stats: {
        user_deviations: number
        user_favourites: number
        user_comments: number
        profile_pageviews: number
        profile_comments: number
    }
    collections?: Array<{
        folderid: string
        name: string
    }>
    galleries?: Array<{
        folderid: string
        parent: string | null
        name: string
    }>
}
```
</details>

<details>
<summary>DeviantArtComment</summary>
    
```ts
export interface DeviantArtComment {
    commentid: string
    parentid: string | null
    posted: string
    replies: number
    hidden: string | null
    body: string
    user: DeviantArtUser
}
```
</details>

#### Extending Deviations
The API Deviation object and the RSS Deviation object are missing a couple properties from each other, 
most notably the deviation description and the author's profile info respectively. There are some extending
functions that will extend the objects to add these missing properties.
```ts
async function useAPI() {
    const deviation = await deviantArt.deviation.get({deviationid: "1FA35A6D-E2CD-3CDF-1A65-410AB577BF10"})
    /*Takes an array of DeviantArtDeviation objects*/
    const extendedAPIDeviations = await deviantArt.extendDeviations([deviation])
    //It now has a description!
    extendedAPIDeviations[0].description

    const deviationsRSS = await deviantArt.rss.search("anime", 10, "popular")
    const extendedRSSDeviations = await deviantArt.extendRSSDeviations(deviationsRSS)
    //It now has the author's profile info, such as profile picture and cover photo!
    extendedRSSDeviations[0].author.profile_pic
}
```
