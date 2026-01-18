export type Citrus = {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
};

export type Farm = {
    id: string;
    name: string;
    category: string;
    weatherTag: string;
    latitude: number;
    longitude: number;
    citruses: Citrus[];
    description: string;
};

export const FARMS: Farm[] = [
    {
        id: '1',
        name: '🍊 Orange Farm',
        category: 'Citrus',
        weatherTag: '☀️ Best Today',
        latitude: 24.719,
        longitude: 46.68,
        description: 'Home to the sweetest Valencia and Blood oranges in Riyadh. Pick them fresh!',
        citruses: [
            { id: 'c1', name: 'Valencia Orange', price: 15, image: '🍊', description: 'Sweet and juicy' },
            { id: 'c2', name: 'Blood Orange', price: 18, image: '🩸', description: 'Rich and tart' },
            { id: 'c3', name: 'Mandarin', price: 12, image: '🟠', description: 'Easy to peel snack' },
        ],
    },
    {
        id: '2',
        name: '🌿 Organic Garden',
        category: 'Organic',
        weatherTag: '🌿 Good for Heat',
        latitude: 24.705,
        longitude: 46.665,
        description: 'Certified organic vegetables and sun-ripened lemons.',
        citruses: [
            { id: 'c4', name: 'Organic Lemon', price: 10, image: '🍋', description: 'Zesty and fresh' },
            { id: 'c5', name: 'Lime', price: 12, image: '🍈', description: 'Perfect for drinks' },
        ],
    },
    {
        id: '3',
        name: '🏡 Heritage Farm',
        category: 'Heritage',
        weatherTag: '🧺 Indoor Friendly',
        latitude: 24.73,
        longitude: 46.69,
        description: 'Traditional farming methods preserving the taste of the past.',
        citruses: [
            { id: 'c6', name: 'Grapefruit', price: 14, image: '🧧', description: 'Bitter-sweet balance' },
            { id: 'c7', name: 'Pomelo', price: 20, image: '🟢', description: 'Giant citrus fruit' },
        ],
    },
];
