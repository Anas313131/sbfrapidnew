export const COMPANY = {
  name: 'SBF Rapid',
  group: 'SBF Group',
  tagline: 'Strong. Build. Forever.',
  foundedYear: 1991,
  phone: '+91 70142-88818',
  phoneHref: 'tel:+917014288818',
  email: 'customercare@sbfrapid.com',
  registeredOffice: {
    label: 'Registered office',
    address: 'WZ-106/80, Rajouri Garden Extension, New Delhi – 110027',
    mapQuery: 'WZ-106/80 Rajouri Garden Extension New Delhi 110027',
  },
  plant: {
    label: 'Plant & customer support',
    address: 'Plot No. G 143-151 & F 109-117, General Zone Industrial Area, Karoli, Bhiwadi, Alwar, Rajasthan – 301707',
    mapQuery: 'Plot G 143-151 General Zone Industrial Area Karoli Bhiwadi Alwar Rajasthan 301707',
  },
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/about-us',
    children: [
      { label: 'Company Profile', to: '/about-us', description: 'History, leadership and values' },
      { label: 'Our Clients', to: '/our-clients', description: 'Brands and partners we serve' },
    ],
  },
  { label: 'Our Products', to: '/our-products' },
  { label: 'Manufacturing Processes', to: '/manufacturing-processes' },
  {
    label: 'Media',
    to: '/media',
    children: [
      { label: 'Media Hub', to: '/media', description: 'Ads, press, videos and events' },
      { label: 'Gallery', to: '/gallery', description: 'Plant, products and events' },
      { label: 'Blog', to: '/blog', description: 'News and updates' },
    ],
  },
  { label: 'Our Certificates', to: '/our-certificates' },
  { label: 'Pricing', to: '/pricing' },
] as const;

export const FOOTER_LINKS = [
  { label: 'About SBF Rapid', to: '/about-us' },
  { label: 'Our Products', to: '/our-products' },
  { label: 'Manufacturing', to: '/manufacturing-processes' },
  { label: 'Certificates', to: '/our-certificates' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Find Dealers', to: '/find-dealers' },
  { label: 'Become a Dealer', to: '/become-a-dealer' },
  { label: 'Contact Us', to: '/contact-us' },
];

export const VALUES = [
  { title: 'Innovation & Technology', body: 'Investing in modern rolling and quality-testing technology to keep every bar consistent.' },
  { title: 'Ambition & Dedication', body: 'A team committed to steady growth and to serving builders, dealers and customers well.' },
  { title: 'Honesty & Integrity', body: 'Transparent dealings with channel partners, customers and the communities we operate in.' },
];

export const MILESTONES = [
  { year: '1991', title: 'Journey begins', body: 'SBF Group starts its steel business, laying the foundation for Engineering Trust.' },
  { year: 'Bhiwadi', title: 'Manufacturing base', body: 'Operations established in Bhiwadi, Rajasthan, with MS Ingots, MS Billets and TMT bars.' },
  { year: 'Today', title: 'Dealer & service network', body: 'Channel partners and a doorstep after-sales support team stay close to customers.' },
];
