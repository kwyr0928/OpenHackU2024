"use client";
import { type CSSProperties } from "react";

interface PropsType {
  style?: CSSProperties;
  color?: string;
}

export default function FolderColose({ style, color }: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      style={{ ...style, fill: color || "#f8fafc" }} // styleでfillを渡せるように
    >
      <path
        d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"
        fill={color || "#f8fafc"}
      />
    </svg>
  );
}
