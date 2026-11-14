import { Link } from 'react-router-dom';

type LogoProps = {
  variant?: 'light' | 'dark';
};

export function Logo({ variant = 'dark' }: LogoProps) {
  const image = (
    <img
      src="/assets/images/image.png"
      alt="SBF RAPID TMT, Strong. Build. Forever. with GreenPro certification"
      width={1320}
      height={420}
      className="h-11 w-auto sm:h-12"
    />
  );

  return (
    <Link to="/" className="group inline-flex shrink-0 items-center transition duration-300 hover:opacity-90" aria-label="SBF Rapid home">
      {variant === 'light' ? (
        <span className="inline-flex rounded-xl bg-white px-3 py-2 shadow-card">{image}</span>
      ) : (
        image
      )}
    </Link>
  );
}
