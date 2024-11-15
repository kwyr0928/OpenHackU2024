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
        d="M502.553,103.887L258.381,0.541L0,109.895v122.316l20.618,8.729v171.813l233.213,98.706l237.551-100.542
                V238.923L512,230.201V107.885L502.553,103.887z M240.506,472.204L51.575,392.242V246.141l188.931,79.962V472.204z M240.506,300.89
                L51.575,220.92v-0.491L30.957,211.7v-67.235l209.55,88.699V300.89z M252.115,212.864L44.138,124.83l214.243-90.672l207.969,88.026
                L252.115,212.864z M460.425,390.405l-196.701,83.25V326.103l196.701-83.265V390.405z M481.043,208.903L263.724,300.89v-67.726
                l217.319-91.979V208.903z"
        fill={color || "#4B4B4B"}
      />
    </svg>
  );
}
