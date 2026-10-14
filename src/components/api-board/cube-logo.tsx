import * as React from "react";

interface CubeLogoProps {
  className?: string;
  size?: number;
}

/**
 * Blue cube mascot with a friendly face.
 * Used as the site logo and favicon.
 */
export function CubeLogo({ className, size = 32 }: CubeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="API Board cube logo"
    >
      <defs>
        <linearGradient id="cubeFrontG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cubeTopG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="cubeSideG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      {/* top face */}
      <path d="M32 4 L58 18 L32 32 L6 18 Z" fill="url(#cubeTopG)" />
      {/* left face */}
      <path d="M6 18 L32 32 L32 60 L6 46 Z" fill="url(#cubeSideG)" />
      {/* right (front) face */}
      <path d="M58 18 L32 32 L32 60 L58 46 Z" fill="url(#cubeFrontG)" />
      {/* eyes on front face */}
      <circle cx="40" cy="36" r="2.4" fill="#ffffff" />
      <circle cx="50" cy="36" r="2.4" fill="#ffffff" />
      {/* smile */}
      <path
        d="M38 44 Q45 50 52 44"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
