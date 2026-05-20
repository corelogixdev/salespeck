import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#405189",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M11 11h15.5l2.5 4.2V29a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2z"
            fill="white"
          />
          <path
            d="M26.5 11L29 15.2H26a2 2 0 0 1-2-2V11z"
            fill="#cbd5e1"
          />
          <path
            d="M14 18.5h12M14 22h9"
            stroke="#405189"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15.5 26.5l3-3.2 2.5 2.2 4.5-5"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
