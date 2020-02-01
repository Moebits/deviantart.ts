import {DeviantArtDeviation} from "../types/index"

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

export interface DeviantArtUserFriends {
    has_more: boolean
    next_offset: number | null
    results: {
    user: DeviantArtUser
    is_watching: boolean
    watches_you: boolean
    lastvisit: string| null
    watch: {
        friend: boolean
        deviations: boolean
        journals: boolean
        forum_threads: boolean
        critiques: boolean
        scraps: boolean
        activity: boolean
        collections: boolean
        }
    }
}

export interface DeviantArtStatus {
    statusid?: string
    body?: string
    ts?: string
    url?: string
    comments_count?: number
    is_share?: boolean
    is_deleted: boolean
    author?: DeviantArtUser
    items?: Array<{
        type: string
        status: DeviantArtStatus
        deviation: DeviantArtDeviation
    }>
}

export interface DeviantArtUserStatuses {
    has_more: boolean
    next_offset: number | null
    results: DeviantArtStatus[]
}

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

export interface DeviantArtWatchers {
    has_more: boolean
    next_offset: number | null
    results: Array<{
        user: DeviantArtUser
        is_watching: boolean
        lastvisit: string | null
        watch: {
            friend: boolean
            deviations: boolean
            journals: boolean
            forum_threads: boolean
            critiques: boolean
            scraps: boolean
            activity: boolean
            collections: boolean
        }
    }>
}

export interface DeviantArtFriendSearch {
    results: DeviantArtUser[]
}
