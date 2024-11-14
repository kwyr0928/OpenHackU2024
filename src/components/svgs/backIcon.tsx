"use client";
import { type CSSProperties } from "react";

interface PropsType {
  style?: CSSProperties;
  color?: string;
}

export default function boxIcon({ style, color }: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="256px"
      width="256px"
      viewBox="0 0 512 512"
      style={{ ...style, fill: color || "#4B4B4B" }} // styleでfillを渡せるように
    >
      <path
        d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"
        fill={color || "#4B4B4B"}
      />
    </svg>
  );
}
