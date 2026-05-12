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

export interface Employee {
    id: number;
    lastname: string;
    firstname: string;
    title: string;
    reportsto: number | null;
    birthdate: string;
    hiredate: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
    phone: string;
    fax: string;
    email: string;
}

