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

type ListingDetails = {
	ref: string;
	features: string[];
	area: string;
	region: string;
	bedrooms: string;
	bathrooms: string;
	type: string;
	images: { originals: string[]; thumbnails: string[] };
	sentences: { en: string[]; de: string[]; es: string[]; nl: string[] };
	latitude: string | null;
	longitude: string | null;
	price: string;
	descriptions: { en: string[]; de: string[]; es: string[]; nl: string[] };
	related_listings: Listing[];
};

type AlertFormData = {
	identifier: string | null;
	first_name: string | null;
	email: string | null;
	region: string | null;
	areas: string[];
	bedrooms: string | null;
	bathrooms: string | null;
	price_max: string | null;
	type: string | null;
	frequency: string;
	verified: boolean;
};

type BlogPost = {
	id: string;
	title: string;
	cover: string;
	category: string;
	slug: string;
	tags: string[];
	published_when: string;
};

type Block = {
	type: string;
	data: {
		text?: string;
		level?: number;
		style?: string;
		items?: string[];
		file?: {
			url: string;
			alt: string;
			href?: string;
		};
	};
};

type BlogData = {
	title: string;
	cover: string;
	content: {
		time: number;
		blocks: Block[];
		version: string;
	};
	slug: string;
	id: number;
	tags: string;
	author: string;
	published_when: string;
	description: string;
	category: string;
	related_listings: any[];
};

export type { Listing, AlertFormData, ListingDetails, BlogPost, BlogData, Block };
