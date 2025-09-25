export type CatalogEntry = {
  id: string;
  country: string;
  capital: string;
  altNames?: string[];
};

export const CATALOG: CatalogEntry[] = [
  {
    id: 'US',
    country: 'United States',
    capital: 'Washington, D.C.',
    altNames: ['USA', 'United States of America']
  },
  {
    id: 'CA',
    country: 'Canada',
    capital: 'Ottawa'
  },
  {
    id: 'MX',
    country: 'Mexico',
    capital: 'Mexico City',
    altNames: ['Ciudad de Mexico']
  },
  {
    id: 'BR',
    country: 'Brazil',
    capital: 'Brasilia',
    altNames: ['Federative Republic of Brazil']
  },
  {
    id: 'AR',
    country: 'Argentina',
    capital: 'Buenos Aires'
  },
  {
    id: 'GB',
    country: 'United Kingdom',
    capital: 'London',
    altNames: ['Great Britain', 'UK', 'United Kingdom of Great Britain and Northern Ireland']
  },
  {
    id: 'FR',
    country: 'France',
    capital: 'Paris'
  },
  {
    id: 'DE',
    country: 'Germany',
    capital: 'Berlin',
    altNames: ['Federal Republic of Germany']
  },
  {
    id: 'ES',
    country: 'Spain',
    capital: 'Madrid',
    altNames: ['Kingdom of Spain']
  },
  {
    id: 'IT',
    country: 'Italy',
    capital: 'Rome',
    altNames: ['Italian Republic']
  },
  {
    id: 'RU',
    country: 'Russia',
    capital: 'Moscow',
    altNames: ['Russian Federation']
  },
  {
    id: 'CN',
    country: 'China',
    capital: 'Beijing',
    altNames: ["People's Republic of China", 'PRC']
  },
  {
    id: 'JP',
    country: 'Japan',
    capital: 'Tokyo'
  },
  {
    id: 'KR',
    country: 'South Korea',
    capital: 'Seoul',
    altNames: ['Republic of Korea', 'ROK']
  },
  {
    id: 'IN',
    country: 'India',
    capital: 'New Delhi',
    altNames: ['Republic of India']
  },
  {
    id: 'AU',
    country: 'Australia',
    capital: 'Canberra',
    altNames: ['Commonwealth of Australia']
  },
  {
    id: 'NZ',
    country: 'New Zealand',
    capital: 'Wellington',
    altNames: ['Aotearoa']
  },
  {
    id: 'ZA',
    country: 'South Africa',
    capital: 'Pretoria',
    altNames: ['Republic of South Africa']
  },
  {
    id: 'EG',
    country: 'Egypt',
    capital: 'Cairo',
    altNames: ['Arab Republic of Egypt']
  },
  {
    id: 'NG',
    country: 'Nigeria',
    capital: 'Abuja',
    altNames: ['Federal Republic of Nigeria']
  }
];
