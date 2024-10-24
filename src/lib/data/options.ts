// TODO: Move to load function

export const propertyTypeOptions = [
	{ label: 'Any type', value: '' },
	{ label: 'Apartment', value: 'Apartment' },
	{ label: 'Commercial and Hotel', value: 'Commercial and Hotel' },
	{ label: 'Finca / Rural house', value: 'Finca / Rural house' },
	{ label: 'House / Villa', value: 'House / Villa' },
	{ label: 'Land', value: 'Land' },
	{ label: 'Penthouse', value: 'Penthouse' }
];

export const propertyRegionOptions = [
	{
		value: null,
		label: 'All regions'
	},
	{
		value: 'costa-almeria',
		label: 'Costa Almería'
	},
	{
		value: 'costa-blanca',
		label: 'Costa Blanca'
	},
	{
		value: 'costa-calida',
		label: 'Costa Cálida'
	},
	{
		value: 'costa-del-sol',
		label: 'Costa del Sol'
	},
	{
		value: 'gran-canaria',
		label: 'Gran Canaria'
	},
	{
		value: 'ibiza',
		label: 'Ibiza'
	},
	{
		value: 'lanzarote',
		label: 'Lanzarote'
	},
	{
		value: 'mallorca',
		label: 'Mallorca'
	},
	{
		value: 'menorca',
		label: 'Menorca'
	},
	{
		value: 'tenerife',
		label: 'Tenerife'
	}
];

export const emailFrequencyOptions = [
	{ label: 'Every day', value: 1 },
	{ label: 'Once a week', value: 7 },
	{ label: 'Once a month', value: 30 }
];

export const maxPriceOptions = [
	{ label: '€100,000', value: 100000 },
	{ label: '€200,000', value: 200000 },
	{ label: '€300,000', value: 300000 },
	{ label: '€400,000', value: 400000 },
	{ label: '€500,000', value: 500000 },
	{ label: '€600,000', value: 600000 },
	{ label: '€700,000', value: 700000 },
	{ label: '€800,000', value: 800000 },
	{ label: '€900,000', value: 900000 },
	{ label: '€1,000,000', value: 1000000 },
	{ label: 'No limit', value: null }
];

export const bedAndBathroomOptions = [
	{ label: 'Any amount', value: 0 },
	{ label: '1+', value: 1 },
	{ label: '2+', value: 2 },
	{ label: '3+', value: 3 },
	{ label: '4+', value: 4 },
	{ label: '5+', value: 5 }
];
