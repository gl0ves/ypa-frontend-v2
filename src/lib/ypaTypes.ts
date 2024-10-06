type Listing = {
	ref: string;
	features: string[];
	area: string;
	region: string;
	bedrooms: number;
	bathrooms: number;
	type: string;
	image: string;
	thumbnail: string;
	sentences: { en: string[]; de: string[]; es: string[]; nl: string[] };
	latitude: string | null;
	longitude: string | null;
	price: number;
};

type AlertFormData = {
	identifier: string | null;
	first_name: string | null;
	email: string | null;
	region: string | null;
	areas: string[];
	bedrooms: number | null;
	bathrooms: number | null;
	price_max: number | null;
	type: string | null;
	frequency: 1 | 7 | 30;
};

export type { Listing, AlertFormData };
