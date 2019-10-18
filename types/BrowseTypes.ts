import {DeviantArtDeviation, DeviantArtUser} from "../types"

export interface DeviantArtCategoryTree {
    categories: Array<{
        catpath: string
        title: string
        has_subcategory: boolean
        parent_catpath: string
    }>
}

export interface DeviantArtSearchResults {
    has_more: boolean
    next_offset: number | null
    results: DeviantArtDeviation[]
}

export interface DeviantArtMoreLikeThisPreview {
    seed: string
    author: DeviantArtUser
    more_from_artist: DeviantArtDeviation[]
    more_from_da: DeviantArtDeviation[]
}

export interface DeviantArtQueryResults {
    has_more: boolean
    next_offset: number | null
    estimated_total?: number
    results: DeviantArtDeviation[]
}

export interface DeviantArtTagSearch {
    results: {
        tag_name: string[]
    }
}

export interface DeviantArtDailySearch {
    results: DeviantArtDeviation[]
}
