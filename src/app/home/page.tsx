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
      lastEditedTime: "2024/11/14 22:33"
    },
    {
      name: "tanaka",
      age: 40,
      wakeUpTime: "7:30",
      goleTime: "9:20",
      lastEditedTime: "2024/11/14 22:33"
    },
    {
      name: "sasaki",
      age: 50,
      wakeUpTime: "9:30",
      goleTime: "11:10"
    }
  ]
};

//個人を識別するための仮の番号、データベースが完成したらidになるのかな？
const memberNumber = 1;

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center bg-slate-50">
      {/* 現在時刻の表示 */}
      <h1 className="mb-1">
        <DisplayTime />
      </h1>
      <Card className="mt-4 w-3/4 max-w-md border-darkBlue">
        <h5 className="pt-1 pb-1 font-mPlus">
          最終更新時刻：{data.member[memberNumber]?.lastEditedTime}
        </h5>
        <CardHeader className="pb-2 pt-0">
          <div className="text-3xl text-gray-900 mb-1 border rounded-lg p-4 shadow-sm text-slate-800 bg-slate-0 font-mPlus font-Medium"
            style={{ borderColor: "#ACC763" }}>
            <p className="mb-1 text-lg leading-none">
              起床時刻
            </p>
            <p className="font-bold">
              {data.member[memberNumber]?.wakeUpTime}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="p-0 h-64 w-full rounded-md border">
            <div>
              {tags.map((tag) => (
                <React.Fragment key={tag}>
                  <div className="text-sm">{tag}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
          <h1 className="text-3xl mt-4 mb-1 border border-pink-300 rounded-lg p-4 shadow-sm  text-blue-950">
            <p className="mb-1 text-lg leading-none">
              達成時刻
            </p>
            <p className="font-bold">
              {data.member[memberNumber]?.goleTime}
            </p>
          </h1>
          <Link href="/schedule/new">
            <Button size="sm" className="px-8 py-5 mt-3 bg-darkBlue hover:bg-blue-900 text-lg font-mPlus text-slate-100 shadow-lg">
              変更
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="flex  space-x-12 mt-2 font-mPlus">
        <div className="mt-4 flex-col">
          <Link href="/presets">
            <Button className="bg-darkBlue shadow-lg">
              <Image
                src="/image/folder.svg"
                alt="newAllPreset"
                width={30}
                height={30}
              />
            </Button>
          </Link>
          <h1 className="text-darkBlue">
            プリセット
          </h1>
        </div>

        <div className="mt-4 flex-col">
          <Link href="/settings">
            <Button className="bg-darkBlue shadow-lg">
              <Image
                src="/image/setting.svg"
                alt="newAllPreset"
                width={30}
                height={30}
              />
            </Button>
          </Link>
          <h1 className="text-darkBlue">
            設定
          </h1>
        </div>
      </div>
    </div>

  );
}
