export interface DeviantArtStash {
    title: string
    path?: string
    size?: number
    description: string | null
    parentid?: number
    thumb?: {
        src: string
        height: number
        width: number
        transparency: boolean
        }
    artist_comments: string
    original_url: string
    category: string
    creation_time?: number
    files?: {
        src: string
        height: number
        width: number
        transparency: boolean
    }
    submission?: {
        file_size?: string
        resolution?: string
        submitted_with?: {
        app?: string
        url: string
        }
    }
    stats?: {
        views?: number
        views_today?: number
        downloads?: number
        downloads_today?: number
        }
    camera?: {
        [key: string]: string
    }
    stackid: number
    itemid?: number
    tags?: string[]
}

export interface DeviantArtStashItem {
    itemid: number
    stackid: number
    title: string
    path?: string
    description: string | null
    parentid?: number
    artist_comments?: string
    tags?: string[]
    original_url?: string
    category?: string
    creation_time?: number
    files: Array<{
        src: string
        height: number
        width: number
        transparency: boolean
    }>
    submission?: {
    file_size?: string
    resolution?: string
    submitted_with?: {
        app?: string
        url?: string
        }
    }
    stats?: {
    views?: number
    views_today?: number
    downloads?: number
    downloads_today?: number
    }
    camera?: {
    [key: string]: string
    }
    html?: string
    css?: string
    css_fonts?: string[]
}
