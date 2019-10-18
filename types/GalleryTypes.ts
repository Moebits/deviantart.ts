import {DeviantArtDeviation} from "../types"

export interface DeviantArtGalleryResult {
    has_more: boolean
    next_offset: number | null
    name?: string
    results: DeviantArtDeviation[]
}

export interface DeviantArtGalleryAll {
    has_more: boolean
    next_offset: number | null
    results: DeviantArtDeviation[]
}

export interface DeviantArtGalleryFolders {
    results: {
        folderid: string
        parent: string | null
        name: string
        size?: number
        deviations?: DeviantArtDeviation[]
    }
    has_more: boolean
    next_offset: number | null
}
