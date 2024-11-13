import Link from "next/link";
import DisplayTime from "~/components/displayTime/displayTime";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import FolderIconSvg from "~/components/svgs/folderClose"
import SettingIconSvg from "~/components/svgs/setting"
import { Separator } from "~/components/ui/separator"
import DescriptionSvg from "~/components/svgs/description";

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
      itemId: "itemId",
      updateTime: "2024/11/14 22:33",
      timeSet: {
        time: {
          naem: "1限電車",
          time: "11:10"
        }
      },
      items: [
        {
          task: {
            name: "駅まで歩く",
            isStatic: true,
            select: 0,
            options: [
              {
                name: "",
                time: 15
              }
            ]
          },
        },
        {
          task: {
            name: "自転車移動",
            isStatic: true,
            select: 0,
            options: [
              {
                name: "",
                time: 15
              }
            ]
          },
        },
        {
          task: {
            name: "英単語暗記",
            isStatic: true,
            select: 0,
            options: [
              {
                name: "",
                time: 15
              }
            ]
          },
        },
        {
          folder: {
            name: "おしゃれ",
            tasks: [
              {
                task: {
                  name: "着替え",
                  isStatic: true,
                  select: 0,
                  options: [
                    {
                      name: "",
                      time: 15
                    }
                  ]
                }
              },
              {
                task: {
                  name: "メイク",
                  isStatic: false,
                  select: 1,
                  options: [
                    {
                      name: "簡単に",
                      time: 5
                    },
                    {
                      name: "真面目に",
                      time: 10
                    }
                  ]
                }
              },
            ],
          },
        },
        {
          task: {
            name: "朝ごはん",
            isStatic: true,
            select: 0,
            options: [
              {
                name: "",
                time: 15
              }
            ]
          },
        },
      ],
    }
  ]
};



type Task = {
  name: string;
  isStatic: boolean;
  select: number
  options: [{ name: string, time: number }]
};
type Folder = {
  name: string;
  tasks: Task[];
};
type Item = {
  tasks?: Task[];
  folders?: Folder[];
};
type Member = {
  name: string;
  itemId: string;
  updateTime: string;
  timeSet: {
    time: {
      naem: string;
      time: string; // e.g., "11:10"
    };
  };
  items: Array<{
    task?: {
      name: string;
      isStatic: boolean;
      select: number;
      options: Array<{ name: string; time: number }>;
    };
    folder?: {
      name: string;
      tasks: Array<{
        task: {
          name: string;
          isStatic: boolean;
          select: number;
          options: Array<{ name: string; time: number }>;
        };
      }>;
    };
  }>;
};

//個人を識別するための仮の番号、データベースが完成したらidになるのかな？
const memberNumber = 0;

// // タスクの合計時間を求める関数
// const calculateTotalTime = (items: Item[]) => {
//   return items.reduce((totalTime: number, item: Item) => {
//     if (item.tasks) {
//       totalTime += item.tasks.reduce(
//         (sum: number, task: Task) => sum + task.options[0].time,
//         0,
//       );
//     }
//     if (item.folders) {
//       item.folders.forEach((folder: Folder) => {
//         totalTime += folder.tasks.reduce(
//           (sum: number, task: Task) => sum + task.options[0].time,
//           0,
//         );
//       });
//     }
//     return totalTime;
//   }, 0);
// };

// // 起床時刻の計算
// const calculateWakeUpTime = (goalTime: string, totalTime: number) => {
//   const [goalHour, goalMinute] = goalTime
//     ? goalTime.split(":").map(Number)
//     : [0, 0];

//   let goalInMinutes = 0;
//   if (goalHour !== undefined && goalMinute !== undefined) {
//     goalInMinutes = goalHour * 60 + goalMinute;
//   }

//   let wakeUpTimeInMinutes = goalInMinutes - totalTime;

// if (wakeUpTimeInMinutes < 0) {
//   wakeUpTimeInMinutes += 1440;
// }

// const wakeUpHour = Math.floor(wakeUpTimeInMinutes / 60);
// const wakeUpMinute = wakeUpTimeInMinutes % 60;

// return `${wakeUpHour < 10 ? "0" : ""}${wakeUpHour}:${wakeUpMinute < 10 ? "0" : ""}${wakeUpMinute}`;
// };

function calculateRemainingTime(data: { member: Member[] }) {
  const member = data.member[0];

  // Parse timeSet.time.time (e.g., "11:10") to minutes
  const [hours, minutes] = member.timeSet.time.time.split(":").map(Number);
  const totalTimeInMinutes = hours * 60 + minutes;

  // Calculate the total time of all tasks in items
  let taskTimeTotal = 0;
  member.items.forEach(item => {
    if (item.task) {
      // For individual tasks
      taskTimeTotal += item.task.options[item.task.select].time;
    } else if (item.folder) {
      // For tasks inside folders
      item.folder.tasks.forEach(folderTask => {
        taskTimeTotal += folderTask.task.options[folderTask.task.select].time;
      });
    }
  });

  // Calculate remaining time
  let wakeUpTimeInMinutes = totalTimeInMinutes - taskTimeTotal;

  if (wakeUpTimeInMinutes < 0) {
    wakeUpTimeInMinutes += 1440;
  }

  const wakeUpHour = Math.floor(wakeUpTimeInMinutes / 60);
  const wakeUpMinute = wakeUpTimeInMinutes % 60;

  return `${wakeUpHour < 10 ? "0" : ""}${wakeUpHour}:${wakeUpMinute < 10 ? "0" : ""}${wakeUpMinute}`;
}
const remainingTime = calculateRemainingTime(data);



export default function Home() {
  const member = data.member[memberNumber];

  if (!member) {
    return <div>Loading...</div>;
  }

  // const goleTimePreset = member.timeSet.find(
  //   (preset) => 'goleTime' in preset && 'name' in preset
  // ) as { goleTime: string; name: string } | undefined;

  // const totalTime = calculateTotalTime(member.items);
  // const wakeUpTime = goleTimePreset
  //   ? calculateWakeUpTime(goleTimePreset.goleTime, totalTime)
  //   : "N/A"; // goleTimeがない場合は "N/A"などのデフォルト値を設定

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-center font-mPlus text-color-all max-w-md mx-auto">
      {/* 現在時刻の表示 */}
      <h1 className="mb-1">
        <DisplayTime />
      </h1>
      <Card className="mt-4 w-3/4 max-w-md border-4 border-color-all text-gray-700">
        <h5 className="pb-1 pt-1">最終更新時刻：{member?.updateTime}</h5>
        <CardHeader className="pb-2 pt-0">
          <div className="bg-slate-0 mb-1 rounded-lg border-4 border-pink-300 p-4 text-3xl shadow-sm">
            <p className="mb-1 text-lg leading-none">{member.timeSet.time.naem || "-"}</p>
            <p className="font-bold">{member.timeSet.time.time || "N/A"}</p>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full rounded-md border p-0">
            <div className="divide-y divide-black">
              {member.items.map((item, index) => (
                <div key={index} className="">
                  {/* 単一のタスク */}
                  {item.task && (
                      <div className="flex items-center justify-between mb-2 mt-2">
                        <div className="flex items-center">
                          <DescriptionSvg style={{ width: "30px", height: "30px" }} color={"#FFA660"} />
                          <p className="ml-3 text-lg">{item.task.name}</p>
                        </div>
                        <p className="text-sm mr-3">
                          {item.task.options[item.task.select].time}分
                        </p>
                      </div>
                  )}

                  {/* フォルダとその内部タスク */}
                  {item.folder && (
                    <div className="border border-gray-300 bg-color-folder p-2">
                      <h4 className="mb-2 text-lg font-bold">{item.folder.name}</h4>
                      <div className="divide-y divide-darkBlue">
                        {item.folder.tasks.map((folderTask, taskIndex) => (
                          <div key={taskIndex}>
                            <div className="flex items-center justify-between bg-white p-2">
                              <div className="flex items-center">
                                <DescriptionSvg style={{ width: "30px", height: "30px" }} color={"#FFA660"} />
                                <p className="ml-3 text-lg">{folderTask.task.name}</p>
                              </div>
                              <p className="text-sm mr-3">
                                {folderTask.task.options[folderTask.task.select].time}分
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
