let counter = 0;

interface PkycLogoProps {
  size?: number;
  className?: string;
}

export function PkycLogo({ size = 44, className }: PkycLogoProps) {
  const id = `pkyc-${++counter}`;

  return (
    <svg
      className={`shrink-0 ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-hex`}
          x1="24"
          y1="3"
          x2="24"
          y2="47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4ADE80" />
          <stop offset="0.5" stopColor="#22C55E" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
        <linearGradient
          id={`${id}-chk`}
          x1="18"
          y1="19"
          x2="30"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#22C55E" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      {/* Green filled circle background */}
      <circle cx="24" cy="24" r="24" fill={`url(#${id}-hex)`} />
      {/* Inner white hex */}
      <path
        d="M24 9L12 15v10c0 7.5 5.1 14.5 12 16.1C30.9 39.5 36 32.5 36 25V15L24 9z"
        fill="white"
      />
      {/* Green checkmark */}
      <path
        d="M18 24.5L22 28.5L30 19"
        stroke={`url(#${id}-chk)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
