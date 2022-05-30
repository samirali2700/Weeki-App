export interface ChatOverview {
    id: string,
    timestamp: number,
    lastMessage?: string,
    from?: string
    createdAt?: string,
    createdBy?: string,
}

export interface ChatContent {
    id: string,
    message: string,
    from?: string,
    timestamp?: string
}

export interface PublicRoom {
    title: string,
    lastMessage: string,
    from?: String,
    timestamp?: number,
    admin?: String,
    createdAt?: number,
}