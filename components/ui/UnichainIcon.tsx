import React from "react";

interface UnichainIconProps {
  className?: string;
  size?: number;
}

export function UnichainIcon({ className = "", size = 18 }: UnichainIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 257 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="256"
        height="256"
        transform="translate(0.5)"
        fill="url(#paint0_radial_1246_2747)"
      />
      <path
        d="M234.684 125.98C177.129 125.98 130.52 79.3245 130.52 21.8159H126.48V125.98H22.3159V130.02C79.8714 130.02 126.48 176.675 126.48 234.184H130.52V130.02H234.684V125.98Z"
        fill="currentColor"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1246_2747"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(128 128) rotate(90) scale(128)"
        >
          <stop stopColor="#FC74FE" />
          <stop offset="1" stopColor="#F50DB4" />
        </radialGradient>
      </defs>
    </svg>
  );
}
