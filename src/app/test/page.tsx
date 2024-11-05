"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [name, setName] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/sample");
                setName(response.data.message);
            } catch (error) {
                console.error("コメントの取得に失敗しました。", error);
            }
        };
        fetchData();
    }, []);
    return (
        <p>{name}</p>
    );
}
