import React from "react";

interface CustomIconProps {
  className?: string;
  size?: number;
  children: React.ReactNode;
}

export function CustomIcon({
  className = "",
  size = 18,
  children,
}: CustomIconProps) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      {children}
    </div>
  );
}

// Example usage for different custom icons
export function EthereumIcon({
  className = "",
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <CustomIcon className={className} size={size}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z"
          fill="#627EEA"
        />
        <path
          d="M16.498 4v8.87l7.497 4.35L16.498 4z"
          fill="#fff"
          fillOpacity="0.602"
        />
        <path d="M16.498 4L9 17.22l7.498-4.35z" fill="#fff" />
        <path
          d="M16.498 21.968v6.027L24 18.616l-7.502 3.352z"
          fill="#fff"
          fillOpacity="0.602"
        />
        <path d="M16.498 27.995v-6.028L9 18.616l7.498 9.379z" fill="#fff" />
        <path
          d="M16.498 20.573l7.497-4.353-7.497-4.35v8.703z"
          fill="#fff"
          fillOpacity="0.2"
        />
        <path
          d="M9 16.22l7.498 4.353V12.87L9 16.22z"
          fill="#fff"
          fillOpacity="0.602"
        />
      </svg>
    </CustomIcon>
  );
}
