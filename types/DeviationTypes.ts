import {DeviantArtUser} from "../types"

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

export interface DeviationMetaData {
    metadata: {
        deviationid: string
        printid: string
        author: DeviantArtUser
        is_watching: boolean
        title: string
        description: string
        license: string
        allows_comments: boolean
        tags: Array<{
            tag_name: string
            sponsored: boolean
            sponsor: string
        }>
        is_favourited: boolean
        is_mature: boolean
        submission?: {
            creation_time: string
            category: string
            file_size: string
            resolution?: string
            submitted_with: {
                app: string
                url: string
            }
        }
        stats?: {
            views: number
            views_today: number
            favourites: number
            comments: number
            downloads: number
            downloads_today: number
        }
        camera?: {
            [key: string]: string
        }
        collections?: Array<{
            folderid: string
            name: string
        }>
    }
}

export interface DeviationContent {
    html: string
    css: string
    css_fonts: string[]
}

export interface DeviationWhoFaved {
    has_more: boolean
    next_offset: number | null
    results: {
        user: DeviantArtUser
        time: number
    }
}

export interface DeviationDownload {
    src: string
    height: number
    width: number
    filesize: number
}

export interface DeviationEmbeddedContent {
    has_more: boolean
    next_offset: number
    has_less: boolean
    prev_offset: number
    results: DeviantArtDeviation[]
}

export interface DeviantArtDeviationExtended extends DeviantArtDeviation {
    description: string
    keywords: string[]
    copyright: string
}
