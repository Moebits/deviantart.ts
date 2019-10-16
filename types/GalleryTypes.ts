import {DeviantArtDeviation} from "./DeviationTypes"

export interface GalleryResult {
    has_more: boolean
    next_offset: number | null
    name?: string
    results: DeviantArtDeviation[]
}

export interface GalleryAll {
    has_more: boolean
    next_offset: number | null
    results: DeviantArtDeviation[]
}

export interface GalleryFolders {
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
