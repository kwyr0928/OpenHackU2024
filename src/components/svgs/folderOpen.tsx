"use client";
import { CSSProperties } from 'react';

interface PropsType {
    style?: CSSProperties;
    color?: string;
}

export default function FolderOpen({ style, color }: PropsType) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            style={{ ...style, fill: color || '#f8fafc' }}  // styleでfillを渡せるように
        >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"
                fill={color || '#f8fafc'} />
        </svg>
    );

} 