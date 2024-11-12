import Link from "next/link";
import DisplayTime from "~/components/displayTime/displayTime";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import FolderIconSvg from "~/components/svgs/folderClose"
import SettingIconSvg from "~/components/svgs/setting"
import Tasks from "~/components/display/displayTask"

type TaskSets = {
  task: {
    name: string,
    itemId: string,
    isStatic: boolean,
    options: {
      name: string,
      time: number;
    }[];
  }[];
};

async function fetchTaskSets() {
  try {
    const response = await fetch('/api/schedule');
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();  // JSON データを `data` に格納
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}



const data = {
  member: [
    {
      name: "sasaki",
      timepresets: [
        { name: "1限電車", goleTime: "11:10" },
      ],
      lastEditedTime: "2024/11/14 22:33",
      items: [
        {
          tasks: [
            { name: "駅まで歩く", timeRequired: 5 },
            { name: "自転車移動", timeRequired: 15 },
            { name: "英単語暗記", timeRequired: 5 },
          ],
        },
        {
          folders: [
            {
              name: "おしゃれ",
              tasks: [
                { name: "着替え", timeRequired: 10 },
                { name: "メイク", timeRequired: 10 },
                { name: "ヘアメイク", timeRequired: 10 },
              ],
            },
            {
              name: "おしゃれ2",
              tasks: [
                { name: "着替え2", timeRequired: 10 },
                { name: "メイク2", timeRequired: 10 },
                { name: "ヘアメイク2", timeRequired: 10 },
              ],
            },
          ],
        },
        {
          tasks: [
            { name: "シャワー", timeRequired: 20 },
            { name: "朝ごはん", timeRequired: 20 },
            { name: "洗顔", timeRequired: 10 },
          ],
        },
      ],
    },
  ],
};


type Task = {
  name: string;
  timeRequired: number;
};
type Folder = {
  name: string;
  tasks: Task[];
};
type Item = {
  tasks?: Task[];
  folders?: Folder[];
};

//個人を識別するための仮の番号、データベースが完成したらidになるのかな？
const memberNumber = 0;

// タスクの合計時間を求める関数
const calculateTotalTime = (items: Item[]) => {
  return items.reduce((totalTime: number, item: Item) => {
    if (item.tasks) {
      totalTime += item.tasks.reduce(
        (sum: number, task: Task) => sum + task.timeRequired,
        0,
      );
    }
    if (item.folders) {
      item.folders.forEach((folder: Folder) => {
        totalTime += folder.tasks.reduce(
          (sum: number, task: Task) => sum + task.timeRequired,
          0,
        );
      });
    }
    return totalTime;
  }, 0);
};

// 起床時刻の計算
const calculateWakeUpTime = (goalTime: string, totalTime: number) => {
  const [goalHour, goalMinute] = goalTime
    ? goalTime.split(":").map(Number)
    : [0, 0];

  let goalInMinutes = 0;
  if (goalHour !== undefined && goalMinute !== undefined) {
    goalInMinutes = goalHour * 60 + goalMinute;
  }

  let wakeUpTimeInMinutes = goalInMinutes - totalTime;

  if (wakeUpTimeInMinutes < 0) {
    wakeUpTimeInMinutes += 1440;
  }

  const wakeUpHour = Math.floor(wakeUpTimeInMinutes / 60);
  const wakeUpMinute = wakeUpTimeInMinutes % 60;

  return `${wakeUpHour < 10 ? "0" : ""}${wakeUpHour}:${wakeUpMinute < 10 ? "0" : ""}${wakeUpMinute}`;
};


export default function Home() {
  const member = data.member[memberNumber];

  if (!member) {
    return <div>Loading...</div>;
  }

  const goleTimePreset = member.timepresets.find(
    (preset) => 'goleTime' in preset && 'name' in preset
  ) as { goleTime: string; name: string } | undefined;

  const totalTime = calculateTotalTime(member.items);
  const wakeUpTime = goleTimePreset
    ? calculateWakeUpTime(goleTimePreset.goleTime, totalTime)
    : "N/A"; // goleTimeがない場合は "N/A"などのデフォルト値を設定

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-center font-mPlus text-darkBlue max-w-md mx-auto">
      {/* 現在時刻の表示 */}
      <Tasks/>
      <h1 className="mb-1">
        <DisplayTime />
      </h1>
      <Card className="mt-4 w-3/4 max-w-md border-darkBlue">
        <h5 className="pb-1 pt-1">最終更新時刻：{member?.lastEditedTime}</h5>
        <CardHeader className="pb-2 pt-0">
          <div className="bg-slate-0 mb-1 rounded-lg border border-pink-300 p-4 text-3xl shadow-sm">
            <p className="mb-1 text-lg leading-none">{goleTimePreset?.name || "-"}</p>
            <p className="font-bold">{goleTimePreset?.goleTime || "N/A"}</p>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full rounded-md border p-0">
            <div className="space-y-3">
              {member.items.map((item, index) => (
                <div key={index} className="space-y-4">
                  {/* items内のタスク */}
                  {item.tasks && (
                    <div className="space-y-2">
                      {item.tasks.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="m-2 flex items-center justify-between rounded-md bg-lime-100 p-3 shadow-sm"
                        >
                          <p className="text-lg font-medium">{task.name}</p>
                          <p className="text-sm">{task.timeRequired}分</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* フォルダ内タスク */}
                  {item.folders && (
                    <div className="space-y-2">
                      {item.folders.map((folder, folderIndex) => (
                        <div
                          key={folderIndex}
                          className="m-2 rounded-lg border bg-violet-200 p-4"
                        >
                          <h4 className="mb-2 text-lg font-bold">
                            {folder.name}
                          </h4>
                          <div className="space-y-2">
                            {folder.tasks.map((task, taskIndex) => (
                              <div
                                key={taskIndex}
                                className="flex items-center justify-between rounded-md bg-lime-100 p-3 shadow-sm"
                              >
                                <p className="text-lg font-medium">
                                  {task.name}
                                </p>
                                <p className="text-sm">{task.timeRequired}分</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div
            className="mb-1 mt-4 rounded-lg border p-4 text-3xl shadow-sm"
            style={{ borderColor: "#ACC763" }}
          >
            <p className="mb-1 text-lg leading-none">起床時刻</p>
            <p className="font-bold">{wakeUpTime}</p>
          </div>
          <Link href="/schedule/new">
            <Button
              size="sm"
              className="mt-3 bg-darkBlue px-8 py-5 text-lg shadow-lg hover:bg-blue-900"
            >
              変更
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-2 flex space-x-12">
        <div className="mt-4 flex-col">
          <Link href="/presets">
            <Button className="bg-darkBlue shadow-lg hover:bg-blue-950">
              <FolderIconSvg style={{ width: "30px", height: "30px" }} color={""} />
            </Button>
          </Link>
          <h1>プリセット</h1>
        </div>



        <div className="mt-4 flex-col">
          <Link href="/settings">
            <Button className="bg-darkBlue shadow-lg hover:bg-blue-950">
              <SettingIconSvg style={{ width: "30px", height: "30px" }} color={""} />
            </Button>
          </Link>
          <h1>設定</h1>
        </div>
      </div>
    </div>
  );
}
