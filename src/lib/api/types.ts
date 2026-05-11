export interface Artist {
    id: number;
    name: string;
}

export interface Album {
    id: number;
    title: string;
}

export interface Track {
    id: number;
    name: string;
    mediaType: string;
    genre: string;
    composer: string;
    milliseconds: number;
    bytes: number;
    unitPrice: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MediaType {
    id: number;
    name: string;
}