import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import DisplayTime from "~/components/displayTime/displayTime";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

const data = {
  member: [
    {
      name: "yusuke",
      age: 30,
      wakeUpTime: "6:30",
      goleTime: "9:20",
    },
    {
      name: "tanaka",
      age: 40,
      wakeUpTime: "7:30",
      goleTime: "9:20",
    },
    {
      name: "sasaki",
      age: 50,
      wakeUpTime: "9:30",
      goleTime: "11:10",
    },
  ],
};

//個人を識別するための仮の番号、データベースが完成したらidになるのかな？
const memberNumber = 1;

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-center">
      {/* 現在時刻の表示 */}
      <h1 className="mb-1">
        <DisplayTime />
      </h1>
      <Card className="mt-4 w-3/4 max-w-md">
        <CardHeader className="pb-2">
          <div
            className="mb-1 rounded-lg border border-gray-300 p-4 text-3xl font-bold text-gray-900 text-slate-100 shadow-sm"
            style={{ backgroundColor: "#ACC763" }}
          >
            <p className="mb-1 text-lg font-medium leading-none">起床時刻</p>
            {data.member[memberNumber]?.wakeUpTime}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full rounded-md border p-0">
            <div>
              {tags.map((tag) => (
                <React.Fragment key={tag}>
                  <div className="text-sm">{tag}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
          <h1 className="mb-1 mt-4 rounded-lg border border-gray-300 bg-pink-200 p-4 text-3xl font-bold text-blue-950 shadow-sm">
            <p className="mb-1 text-lg font-medium leading-none">達成時刻</p>
            {data.member[memberNumber]?.goleTime}
          </h1>
          <Button
            size="sm"
            className="bg-customColor mt-3 text-lg text-slate-100 hover:bg-blue-900"
          >
            <Link href="/schedule/new">　　　　変更　　　　</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <div className="mt-4 flex-col">
          <p>プリセット</p>
          <Link href="/presets">
            <Button>
              <Image
                src="/image/file.svg"
                alt="newAllPreset"
                width={30}
                height={30}
              />
            </Button>
          </Link>
        </div>

        <div className="mt-4 flex-col">
          <p>設定</p>
          <Link href="/settings">
            <Button className="fill-blue-100">
              <Image
                src="/image/setting.svg"
                alt="newAllPreset"
                width={30}
                height={30}
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
