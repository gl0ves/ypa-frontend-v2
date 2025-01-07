const navItems = [
	// { name: 'SEARCH', href: '/' },
	{
		name: 'LOCATIONS',
		href: '',
		subNavItems: [
			{ name: 'ALL SPANISH AREAS', href: '/' },
			{ name: 'COSTA ALMERIA', href: '/costa-almeria/properties' },
			{ name: 'COSTA BLANCA', href: '/costa-blanca/properties' },
			{ name: 'COSTA CALIDA', href: '/costa-calida/properties' },
			{ name: 'COSTA DEL SOL', href: '/costa-del-sol/properties' },
			{ name: 'GRAN CANARIA', href: '/gran-canaria/properties' },
			{ name: 'IBIZA', href: '/ibiza/properties' },
			{ name: 'MALLORCA', href: '/mallorca/properties' },
			{ name: 'MENORCA', href: '/menorca/properties' },
			{ name: 'TENERIFE', href: '/tenerife/properties' },
			{ name: 'LANZAROTE', href: '/lanzarote/properties' }
		]
	},
	{
		name: 'OTHER SERVICES ',
		href: '',
		subNavItems: [
			{ name: 'CURRENCY', href: '/other-services/currency' },
			{ name: 'MORTGAGE', href: '/other-services/mortgage' },
			{ name: 'LEGAL', href: '/other-services/legal' },
			{ name: 'SPANISH COURSE', href: '/other-services/spanish-course' }
		]
	},

	// { name: 'AGENTS', href: '/agents' },
	{ name: 'BLOG', href: '/blog' },
	{ name: 'ABOUT', href: '/about' }
];

export { navItems };
