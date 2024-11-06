"use client";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function DisplayTime(){
    const [time, setTime] = useState<string>("23:56");

    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setTime(`${hours}:${minutes}`);
    }

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime,1000);
        return () => clearInterval(intervalId); // クリーンアップ
    })
    return(
        <p>{time}</p>
    )

}