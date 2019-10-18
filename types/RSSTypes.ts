import {DeviantArtUserProfile} from "./UserTypes"
export interface DeviationRSS {
    title: string
    url: string
    date: string
    rating: string
    category: string
    categoryPath: string
    keywords: string[]
    author: string
    copyright: string
    description: string
    thumbnails: DeviationThumbnailRSS[]
    content: DeviationImageRSS[]
}

export interface DeviationThumbnailRSS {
    url: string
    height: string
    width: string
}

export interface DeviationImageRSS {
    url: string
    height: string
    width: string
    medium: string
}

export interface DeviationRSSExtended extends Omit<DeviationRSS, "author"> {
    author: DeviantArtUserProfile
}
