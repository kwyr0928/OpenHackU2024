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
      name: "sasaki",
      goleTime: "11:10",
      lastEditedTime: "2024/11/14 22:33",
      items: [
        {
          tasks: [
            { taskName: "駅まで歩く", timeRequired: 5 },
            { taskName: "自転車移動", timeRequired: 15 },
            { taskName: "英単語暗記", timeRequired: 5, },
          ],
        },
        {
          folders: [
            {
              name: "おしゃれ",
              tasks: [
                { name: "着替え", timeRequired: 10 },
                { name: "メイク", timeRequired: 10 },
                { name: "ヘアメイク", timeRequired: 10 }
              ]
            },
            {
              name: "おしゃれ2",
              tasks: [
                { name: "着替え2", timeRequired: 10 },
                { name: "メイク2", timeRequired: 10 },
                { name: "ヘアメイク2", timeRequired: 10 }
              ]
            }
          ],
        },
        {
          tasks: [
            { taskName: "シャワー", timeRequired: 20, },
            { taskName: "朝ごはん", timeRequired: 20, },
            { taskName: "洗顔", timeRequired: 10, },
          ],
        }
      ]
    }
  ]
};

//個人を識別するための仮の番号、データベースが完成したらidになるのかな？
const memberNumber = 0;

// タスクの合計時間を求める関数
const calculateTotalTime = (items: any[]) => {
  return items.reduce((totalTime: number, item: any) => {
    if (item.tasks) {
      totalTime += item.tasks.reduce(
        (sum: number, task: any) => sum + task.timeRequired,
        0
      );
    }
    if (item.folders) {
      item.folders.forEach((folder: any) => {
        totalTime += folder.tasks.reduce(
          (sum: number, task: any) => sum + task.timeRequired,
          0
        );
      });
    }
    return totalTime;
  }, 0);
};

// 起床時刻の計算
const calculateWakeUpTime = (goalTime: string, totalTime: number) => {
  const [goalHour, goalMinute] = goalTime ? goalTime.split(":").map(Number) : [0, 0];
  let goalInMinutes = 0;
  if (goalHour !== undefined && goalMinute !== undefined) {
    goalInMinutes = goalHour * 60 + goalMinute;
  }
  const wakeUpTimeInMinutes = goalInMinutes - totalTime;

  const wakeUpHour = Math.floor(wakeUpTimeInMinutes / 60);
  const wakeUpMinute = wakeUpTimeInMinutes % 60;

  return `${wakeUpHour < 10 ? "0" : ""}${wakeUpHour}:${wakeUpMinute < 10 ? "0" : ""}${wakeUpMinute}`;
};



export default function Home() {
  const member = data.member[memberNumber];

  if (!member) {
    return <div>Loading...</div>;
  }
  
  const totalTime = calculateTotalTime(member.items);
  const wakeUpTime = calculateWakeUpTime(member.goleTime, totalTime);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-center">
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

      <div className="mt-2 flex space-x-12 font-mPlus">
        <div className="mt-4 flex-col">
          <Link href="/presets">
            <Button className="bg-darkBlue hover:bg-blue-950 shadow-lg">
              <Image
                src="/image/folder.svg"
                alt="newAllPreset"
                width={30}
                height={30}
              />
            </Button>
          </Link>
          <h1 className="text-darkBlue">プリセット</h1>
        </div>

        <div className="mt-4 flex-col">
          <Link href="/settings">
            <Button className="bg-darkBlue hover:bg-blue-950 shadow-lg">
              <Image
                src="/image/setting.svg"
                alt="newAllPreset"
                width={30}
                height={30}
              />
            </Button>
          </Link>
          <h1 className="text-darkBlue">設定</h1>
        </div>
      </div>
    </div>
  );
}
