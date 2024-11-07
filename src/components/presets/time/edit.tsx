"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import TimePicker from "react-time-picker";
import React, { useState } from "react";

// childrenを受け取るために型定義を追加
interface EditTimeProps {
  children: React.ReactNode;
}

export default function EditTime({ children }: EditTimeProps) {
  const [time, setTime] = useState<string>("10:00"); // 初期値を設定

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value); // 入力された時刻を更新
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="mb-2 flex w-full items-center justify-center rounded-md bg-pink-400 p-2 text-black">
          {children}
        </AccordionTrigger>
        <AccordionContent className="items-center justify-start bg-gray-200 text-xl">
          <input
            type="time" // デバイスのネイティブな時間入力フォーム
            value={time}
            onChange={handleTimeChange}
            className="mt-4 w-full max-w-[200px] rounded-md border p-2" // Shadcn UIのスタイルでカスタマイズ
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
