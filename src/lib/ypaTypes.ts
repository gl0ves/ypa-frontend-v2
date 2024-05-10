type Listing = {
    ref: string;
    features: string[];
    area: string;
    region: string;
    bedrooms: number;
    bathrooms: number;
    type: string;
    images: string;
    thumbnail: string;
    sentences: { en: string[]; de: string[]; es: string[]; nl: string[] };
    latitude: string | null;
    longitude: string | null;
    price: number;
}

export type { Listing };