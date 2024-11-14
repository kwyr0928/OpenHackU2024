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
        d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
        fill={color || "#4B4B4B"}
      />
    </svg>
  );
}
