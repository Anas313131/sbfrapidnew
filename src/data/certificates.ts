export type CertificateCategory =
  | 'Product / BIS'
  | 'Management Systems'
  | 'Factory & Registration'
  | 'Environment'
  | 'Test Reports'
  | 'Technology Licences'
  | 'Other Approvals';

export type CertificateEntry = {
  id: string;
  title: string;
  category: CertificateCategory;
  documentUrl?: string;
};

export const CERTIFICATE_CATEGORIES: CertificateCategory[] = [
  'Product / BIS',
  'Management Systems',
  'Factory & Registration',
  'Environment',
  'Test Reports',
  'Technology Licences',
  'Other Approvals',
];

export const CERTIFICATES: CertificateEntry[] = [
  { id: 'bis-licence', title: 'BIS product licence', category: 'Product / BIS' },
  { id: 'incorporation', title: 'Certificate of incorporation', category: 'Factory & Registration' },
  { id: 'dealership', title: 'Certificate of dealership', category: 'Factory & Registration' },
  { id: 'udyam', title: 'Udyam registration', category: 'Factory & Registration' },
  { id: 'test-certificates', title: 'Test certificates', category: 'Test Reports' },
  { id: 'rspcb', title: 'Rajasthan State Pollution Control Board documents', category: 'Environment' },
  { id: 'environment-clearance', title: 'Environmental impact and clearance items', category: 'Environment' },
  { id: 'cto-cte', title: 'CTO / CTE expansion documents', category: 'Environment' },
  { id: 'iocl', title: 'IOCL approval', category: 'Other Approvals' },
  { id: 'thermex-licence', title: 'Thermex technology licence 2024–25', category: 'Technology Licences' },
];
