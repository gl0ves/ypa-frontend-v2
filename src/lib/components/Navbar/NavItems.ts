const navItems = [
    // { name: 'SEARCH', href: '/' },
    {
        name: 'LOCATIONS',
        href: '',
        subNavItems: [
            { name: 'ALL SPANISH AREAS', href: '/' },
            { name: 'COSTA ALMERIA', href: '/regions/costa-almeria' },
            { name: 'COSTA BLANCA', href: '/regions/costa-blanca' },
            { name: 'COSTA CALIDA', href: '/regions/costa-calida' },
            { name: 'COSTA DEL SOL', href: '/regions/costa-del-sol' },
            { name: 'GRAN CANARIA', href: '/regions/gran-canaria' },
            { name: 'IBIZA', href: '/regions/ibiza' },
            { name: 'MALLORCA', href: '/regions/mallorca' },
            { name: 'MENORCA', href: '/regions/menorca' },
            { name: 'TENERIFE', href: '/regions/tenerife' },
            { name: 'LANZAROTE', href: '/regions/lanzarote' }
        ]
    },
    {
        name: 'OTHER SERVICES ',
        href: '',
        subNavItems: [
            { name: 'CURRENCY', href: '/currency' },
            { name: 'MORTGAGE', href: '/mortgage' },
            { name: 'LEGAL', href: '/legal' }
        ]
    },

    { name: 'AGENTS', href: '/agents' },
    { name: 'BLOG', href: '/blog' },
    { name: 'ABOUT', href: '/about' },
];

export { navItems };