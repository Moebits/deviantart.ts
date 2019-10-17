import {DeviantArtDeviation, DeviantArtStatus, DeviantArtUser} from "../types"

export interface DeviantArtComment {
    commentid: string
    parentid: string | null
    posted: string
    replies: number
    hidden: string | null
    body: string
    user: DeviantArtUser
}
export interface DeviantArtCommentSearch {
    has_more: boolean
    next_offset: number | null
    has_less: boolean
    prev_offset: number | null
    thread: DeviantArtComment[]
}

export interface DeviantArtCommentContext extends DeviantArtCommentSearch {
    context: {
        parent?: DeviantArtComment
        item_profile?: DeviantArtUser
        item_deviation?: DeviantArtDeviation
        item_status?: DeviantArtStatus
    }
}
