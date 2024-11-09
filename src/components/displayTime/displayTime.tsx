"use client";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function DisplayTime() {
    const [time, setTime] = useState<string>();

    function toFullWidth(str: string): string {
        return str.replace(/[\uff01-\uff5e]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
        });
    }

    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setTime(toFullWidth(`${hours}:${minutes}`));
    }


    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId); // クリーンアップ
    })



    return (
        <div className="text-7xl text-darkBlue font-mPlus">
            {time}
        </div>
    )

}
