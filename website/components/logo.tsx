import React from "react";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  inverted?: boolean;
};

export function LogoIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <rect width="40" height="40" rx="10" fill="#405189" />
      <path
        d="M11 11h15.5l2.5 4.2V29a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2z"
        fill="white"
      />
      <path d="M26.5 11L29 15.2H26a2 2 0 0 1-2-2V11z" fill="#c7d0e8" />
      <path
        d="M14 18.5h12M14 22h9"
        stroke="#405189"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M15.5 26.5l3-3.2 2.5 2.2 4.5-5"
        stroke="#3d9b8f"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ size = 36, showWordmark = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoIcon size={size} />
      {showWordmark && (
        <span
          className="text-lg font-semibold tracking-tight text-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          SalesPeck
        </span>
      )}
    </span>
  );
}
