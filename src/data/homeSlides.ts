export type StorySlide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  points?: string[];
};

export const HOME_STORY_SLIDES: StorySlide[] = [
  {
    image: '/assets/images/image%20copy%209.png',
    alt: 'SBF Rapid team member inspecting TMT steel bundles at the plant',
    eyebrow: 'Quality on site',
    title: 'Checked before every dispatch',
    description: 'Our teams inspect steel bundles against a controlled quality process before they leave the plant.',
  },
  {
    image: '/assets/images/image%20copy%2010.png',
    alt: 'Close-up of SBF Rapid TMT bars showing their ribbed surface',
    eyebrow: 'Higher ductility',
    title: 'Higher ductility for stronger structures',
    description: '60% more ductile than other rebars.',
  },
  {
    image: '/assets/images/image%20copy%2011.png',
    alt: 'SBF Rapid 5500D TMT bar with labelled performance benefits',
    eyebrow: 'Built to last',
    title: 'A TMT bar that lasts for decades',
    description: 'Protection and strength built into every bar for a long service life.',
    points: ['Higher tensile strength', 'Superior corrosion shield', 'Enhanced fire safety', 'Longer lifespan'],
  },
  {
    image: '/assets/images/image%20copy%2012.png',
    alt: 'SBF Rapid TMT 550D CRS bar on a dark industrial background',
    eyebrow: 'Strength at the core',
    title: 'When the core is strong, everything stands strong',
    description: 'SBF Rapid TMT bars manufactured under stringent quality controls.',
    points: ['Superior steel chemistry', 'Superior ductility', 'Superior confidence', 'Fe550D certified'],
  },
];
