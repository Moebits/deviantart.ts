import {DeviantArtDeviation, DeviantArtUser} from "../types"

export interface DeviantArtCuratedTags {
    results: {
    tag_name: string
    sponsored: boolean
    sponsor: string
    deviations?: DeviantArtDeviation[]
    }
}

export interface DeviantArtCurated {
    has_more: boolean
    next_offset: number | null
    results: Array<{
        module_name: string
        publication_date: string
        headline?: string
        text?: string
        url?: string
        image_url?: string
        cover_image?: DeviantArtDeviation
        folderid?: string
        youtubeid?: string
        campaign: string
        user: DeviantArtUser
        deviations?: DeviantArtDeviation[]
        tags?: Array<{
            tag_name: string
            sponsored: boolean
            sponsor: string
            }>
        explore_tags?: Array<{
            tag_name: string
            sponsored: boolean
            sponsor: string
            }>
        }>
}
