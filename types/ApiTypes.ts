export interface DeviantArtAuth {
    access_token: string
    token_type: string
    expires_in: number
    status: string
}

export interface ParsedURL {
    title: string | null
    user: string | null
    id: string | null
}

export interface DeviantArtData {
    text: string
}

export interface DeviantArtPlacebo {
    status: string
}
