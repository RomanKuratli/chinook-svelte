export interface Artist {
    id: number;
    name: string;
}

export interface Album {
    id: number;
    title: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MediaType {
    id: number;
    name: string;
}

export interface Track {
    id: number;
    name: string;
    mediatype: MediaType;
    genre: Genre;
    composer: string;
    milliseconds: number;
    bytes: number;
    unitprice: number;
}

