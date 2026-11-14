export type ProductCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export const PRODUCT_CARDS: ProductCard[] = [
  {
    id: 'tmt-bars',
    title: 'TMT Reinforcement Bars',
    subtitle: 'Thermo-Mechanically Treated steel',
    description:
      'Ribbed TMT bars produced through a controlled quenching and self-tempering process, supplied in bar sizes from 8 mm to 40 mm.',
    highlights: ['Bar sizes 8 mm to 40 mm', 'Grades to be confirmed by SBF', 'Straight bundling with barcode'],
  },
  {
    id: 'billets',
    title: 'MS Billets',
    subtitle: 'Mild steel feedstock',
    description:
      'Continuously cast mild steel billets used as feedstock for rolling, forging and extrusion across our own and partner mills.',
    highlights: ['Continuous casting', 'Consistent section quality', 'Supplied to rolling partners'],
  },
];

export const TMT_FEATURES = [
  { title: 'Ductility', body: 'Designed to bend and re-bend on site, subject to approved test data.' },
  { title: 'Weldability', body: 'Chemistry controlled during melting and ferro-alloy addition.' },
  { title: 'Bond strength', body: 'Ribbed surface improves grip with concrete, as confirmed by test results.' },
  { title: 'Corrosion resistance', body: 'Surface and quenching process to be verified against the approved datasheet.' },
];

export const PRODUCT_FAQS = [
  {
    question: 'What does the "D" in grades like 550D mean?',
    answer:
      'The grade designation and its applicable BIS standard will be explained in SBF\u2019s approved technical datasheet.',
  },
  {
    question: 'Which grade should I choose?',
    answer:
      'Grade choice depends on the project and its engineering specification. Please confirm the required grade with your structural engineer, then contact our sales team.',
  },
  {
    question: 'What sizes are available?',
    answer: 'TMT bars are listed from 8 mm to 40 mm. Availability per grade and size will be confirmed by our sales team.',
  },
  {
    question: 'How can I confirm a bar is genuine?',
    answer:
      'Ask your dealer for the current BIS product licence reference and check it against the Our Certificates page or with our customer care team.',
  },
  {
    question: 'How do I request a quote or technical datasheet?',
    answer: 'Use the Get a Quote button or call customer care. Datasheets will be shared once approved by SBF.',
  },
];
