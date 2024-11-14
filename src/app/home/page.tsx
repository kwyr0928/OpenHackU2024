"use client";

import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DisplayTime from "~/components/displayTime/displayTime";
import DescriptionSvg from "~/components/svgs/description";
import FolderIconSvg from "~/components/svgs/folderClose";
import FolderOpenSvg from "~/components/svgs/folderOpen";
import SettingIconSvg from "~/components/svgs/setting";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";


type TaskOption = {
  name: string;
  time: number; // time in minutes
};

type Task = {
  name: string;
  itemId: string;
  isStatic: boolean;
  select: number;
  options: TaskOption[];
};

type Folder = {
  name: string;
  itemId: string;
  tasks: { task: Task }[]; // Tasks inside the folder
};

type ItemSet = {
  folder?: Folder;
  task?: Task;
};

type Time = {
  name: string;
  timeId: string;
  time: string; // time in "HH:mm" format
};

type TimeSet = {
  time: Time;
};

type Whole = {
  name: string;
  itemId: string;
  updateTime: Date; // ISO string format for update time
  timeSet: TimeSet;
  itemSet: ItemSet[]; // Can contain both folders and tasks
};

type WholeSet = {
  whole: Whole;
};

type ResponseData = {
  message: string;
  wholeSet: WholeSet;
};


export default function Home() {
  const { data: session } = useSession();
  const [dataFromDb, setDataFromDb] = useState<ResponseData | null>(null);

  const handleScheduleGet = async () => {
    if (!session?.user?.id) return;
    try {
      const res = await axios.get(`/api/schedule?userId=${session.user.id}`);
      setDataFromDb(res.data);
      console.log(res.data);  // データが正しく取得できているか確認
    } catch (error) {
      console.error(error + "なんで");
    }
  };

  useEffect(() => {
    handleScheduleGet();
  }, []);

  const whole = dataFromDb ? dataFromDb.wholeSet.whole : null;

  if (!whole) {
    handleScheduleGet();
    return <div>Loading...
      <div className="mt-4 flex-col">
        <Link href="/presets">
          <Button className="bg-color-all shadow-lg hover:bg-emerald-500">
            <FolderIconSvg style={{ width: "30px", height: "30px" }} color={""} />
          </Button>
        </Link>
        <h1>プリセット</h1>
      </div>
    </div>;
  } else {
    console.log(dataFromDb);
  }

  function calculateRemainingTime(data: Whole) {
    const [hours = 0, minutes = 0] = data.timeSet.time.time.split(":").map(Number);
    const totalTimeInMinutes = hours * 60 + minutes;

    // アイテム内のタスクの合計時間を計算
    let taskTimeTotal = 0;
    data.itemSet.forEach(item => {
      if (item.task) {
        // 単一タスクの場合
        taskTimeTotal += item.task.options[item.task.select]?.time;
      }
      else if (item.folder) {
        // フォルダ内のタスクの場合
        item.folder.tasks.forEach(folderTask => {
          taskTimeTotal += folderTask.task.options[folderTask.task.select].time;
        });
      }
    });

    // 残り時間を計算
    let wakeUpTimeInMinutes = totalTimeInMinutes - taskTimeTotal;

    if (wakeUpTimeInMinutes < 0) {
      wakeUpTimeInMinutes += 1440; // 残り時間が負の数になる場合、24時間を足す
    }

    const wakeUpHour = Math.floor(wakeUpTimeInMinutes / 60);
    const wakeUpMinute = wakeUpTimeInMinutes % 60;

    return `${wakeUpHour < 10 ? "0" : ""}${wakeUpHour}:${wakeUpMinute < 10 ? "0" : ""}${wakeUpMinute}`;
  }
  const remainingTime = calculateRemainingTime(whole);

  // 日付フォーマット
  const dateString: string = format(whole.updateTime, "yyyy/MM/dd HH:mm");

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-center font-mPlus text-color-all max-w-md mx-auto">
      {/* 現在時刻の表示 */}
      <h1 className="mb-1">
        <DisplayTime />
      </h1>
      <Card className="mt-4 w-3/4 max-w-md border-4 border-color-all text-gray-700">
        <h5 className="pb-1 pt-1">最終更新時刻：{dateString}</h5>
        <CardHeader className="pb-2 pt-0">
          <div className="bg-slate-0 mb-1 rounded-lg border-4 border-pink-300 p-4 text-3xl shadow-sm">
            <p className="mb-1 text-lg leading-none">{whole.timeSet.time.name || "-"}</p>
            <p className="font-bold">{whole.timeSet.time.time || "N/A"}</p>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full rounded-md border-2 border-color-all p-0">
            <div className="divide-y divide-slate-300">
              {whole.itemSet.map((item, index) => (
                <div key={index} className="">
                  {/* 単一のタスク */}
                  {item.task && (
                    <div className="flex items-center justify-between mb-2 mt-2">
                      <div className="flex items-center">
                        <DescriptionSvg style={{ width: "30px", height: "30px" }} color={"#FFA660"} />
                        <p className="ml-3 text-lg">{item.task.name}</p>
                      </div>
                      <p className="text-sm mr-3">
                        {item.task.options[item.task.select].time}min
                      </p>
                    </div>
                  )}
                  {/* フォルダとその内部タスク */}
                  {item.folder && (
                    <div className="border border-gray-300 bg-color-folder p-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FolderOpenSvg style={{ width: "30px", height: "30px" }} color={""} />
                          <h4 className="ml-11 text-lg font-bold">{item.folder.name}</h4>
                        </div>
                      </div>
                      <div className="divide-y divide-slate-300">
                        {item.folder.tasks.map((folderTask, taskIndex) => (
                          <div key={taskIndex}>
                            <div className="flex items-center justify-between bg-white p-2">
                              <div className="flex items-center">
                                <DescriptionSvg style={{ width: "30px", height: "30px" }} color={"#FFA660"} />
                                <p className="ml-3 text-lg">{folderTask.task.name}</p>
                              </div>
                              <p className="text-sm mr-3">
                                {folderTask.task.options[folderTask.task.select].time}min
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div
            className="mb-1 mt-4 rounded-lg border-4 p-4 text-3xl shadow-sm"
            style={{ borderColor: "#9FE48A" }}
          >
            <p className="mb-1 text-lg leading-none">起床時刻</p>
            <p className="font-bold">{remainingTime}</p>
          </div>
          <Link href="/schedule/new">
            <Button
              size="sm"
              className="mt-3 bg-color-all px-8 py-5 text-lg shadow-lg hover:bg-emerald-500"
            >
              変更
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-2 flex space-x-12">
        <div className="mt-4 flex-col">
          <Link href="/presets">
            <Button className="bg-color-all shadow-lg hover:bg-emerald-500">
              <FolderIconSvg style={{ width: "30px", height: "30px" }} color={""} />
            </Button>
          </Link>
          <h1>プリセット</h1>
        </div>

        <div className="mt-4 flex-col">
          <Link href="/settings">
            <Button className="bg-color-all shadow-lg hover:bg-emerald-500">
              <SettingIconSvg style={{ width: "30px", height: "30px" }} color={""} />
            </Button>
          </Link>
          <h1>設定</h1>
        </div>
      </div>
    </div>
  );
}
