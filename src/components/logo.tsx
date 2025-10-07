import Link from "next/link";

const Logo = ({ className }: { className?: string }) => (
  <Link href="/" aria-label="EncryptArx Homepage" className={`flex items-center font-headline text-xl font-bold ${className}`}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 text-primary"
    >
      <path
        d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7L12 12L22 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 15.5V8.5L12 12L20 15.5Z"
        fill="currentColor"
        fillOpacity="0.3"
      />
       <path
        d="M4 15.5V8.5L12 12L4 15.5Z"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
    EncryptArx
  </Link>
);
export default Logo;
