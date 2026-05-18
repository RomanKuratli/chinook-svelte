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

export interface Customer {
    id: number;
    firstname: string;
    lastname: string;
    company: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
    phone: string;
    fax: string;
    email: string;
}

export interface Invoice {
    id: number;
    customer: Customer;
    invoicedate: string;
    billingaddress: string;
    billingcity: string;
    billingstate: string;
    billingcountry: string;
    billingpostalcode: string;
    total: number;
}

export interface InvoiceLine {
    id: number;
    invoice: Invoice;
    track: Track;
    unitprice: number;
    quantity: number;
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

