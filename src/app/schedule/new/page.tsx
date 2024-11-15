"use client";

import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FolderPreset from "~/components/schedule/Folder";
import TaskPreset from "~/components/schedule/Task";
import PlusCircle from "~/components/svgs/plusCircle";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";


type WholeApiResponse = {
  // 全体プリセットの取得
  message: string;
  wholeSets: WholeSet[];
};

type WholeSet = {
  // 全体プリセット　中身
  name: string;
  itemId: string;
};

type DetailWholeApiResponse = {
  // 全体プリセット[id]の取得
  message: string;
  wholeSet: DetailWhole;
};

type DetailWhole = {
  // 全体プリセット[id]　中身
  whole: {
    name: string; // 全体プリセット　名前
    itemId: string; // 全体プリセット　ID
    timeSet: {
      time: {
        name: string; // 時間プリセット　名前
        timeId: string; // 時間プリセット　ID
        time: string; // 時間プリセット　時間
      };
    };
    itemSet: {
      task?: {
        name: string; // タスクプリセット　名前
        itemId: string; // タスクプリセット　ID
        isStatic: boolean; // 固定値かどうか
        select: number;
        options: {
          // プルダウン
          name: string; // 名前
          time: number; // 時間
        }[];
      };
      folder?: {
        name: string; // フォルダプリセット　名前
        itemId: string; // フォルダプリセット　ID
        tasks: {
          task: {
            name: string; // タスクプリセット　名前
            itemId: string; // タスクプリセット　ID
            isStatic: boolean; // 固定値かどうか
            select: number;
            options: {
              // プルダウン
              name: string; // 名前
              time: number; // 時間
            }[];
          }[];
        };
      };
    }[];
  };
};

type TimeApiResponse = {
  // 時間プリセットの取得
  message: string;
  timeSets: TimeSet[];
};

type TimeSet = {
  // 時間プリセット　中身
  time: {
    name: string;
    timeId: string;
    time: string;
  };
};

type FolderApiResponse = {
  // フォルダプリセットの取得
  message: string;
  folderSets: FolderSet[];
};

type FolderSet = {
  // フォルダプリセット　中身
  folder: {
    name: string;
    itemId: string;
    tasks: {
      task: {
        name: string;
        itemId: string;
        isStatic: boolean;
        select: number;
        options: {
          name: string;
          time: number;
        }[];
      };
    }[];
  };
};

type TaskApiResponse = {
  // タスクプリセットの取得
  message: string;
  taskSets: TaskSet[];
};

type TaskSet = {
  // タスクプリセット　中身
  task: {
    name: string;
    itemId: string;
    isStatic: boolean;
    options: {
      name: string;
      time: number;
    }[];
  };
};

export default function Schedule() {
  const [openWhole, setOpenWhole] = useState(false); // 全体　プルダウン
  const [valueWhole, setValueWhole] = useState(""); // 全体　プルダウン
  const [openTime, setOpenTime] = useState(false); // 時間　プルダウン
  const [valueTime, setValueTime] = useState(""); // 時間　プルダウン
  const [isLoading, setIsLoading] = useState(true); // ローディング中かどうか

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // タスク追加　既存プリセット
  const [isTaskModalOpen2, setIsTaskModalOpen2] = useState(false); // タスク追加　新規作成
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false); // フォルダ追加　既存プリセット
  const [isFolderModalOpen2, setIsFolderModalOpen2] = useState(false); // フォルダ追加　新規作成

  const { data: session, status } = useSession(); // セッション情報

  const [tempName, setTempName] = useState<string>(""); // タスク追加　新規作成　タスク名
  const [options1, setOptions1] = useState("デフォルト"); // タスク追加　新規作成　プルダウン　オプション名1
  const [minutes1, setMinutes1] = useState(0); // タスク追加　新規作成　プルダウン　時間1
  const [options2, setOptions2] = useState(""); // 同上2
  const [minutes2, setMinutes2] = useState(0); // 同上2
  const [options3, setOptions3] = useState(""); // 同上3
  const [minutes3, setMinutes3] = useState(0); // 同上3
  const [minutes, setMinutes] = useState(0); // タスク追加　新規作成　固定値　時間

  const [wholePresets, setWholePresets] = useState<WholeSet[]>([]); // 全体プリセット一覧
  const [timePresets, setTimePresets] = useState<TimeSet[]>([]); // 時間プリセット一覧 time:
  const [folderPresets, setFolderPresets] = useState<FolderSet[]>([]); // フォルダプリセット一覧 folder:
  const [taskPresets, setTaskPresets] = useState<TaskSet[]>([]); // タスクプリセット一覧 task;

  const [selectedWholePreset, setSelectedWholePreset] = useState<WholeSet>(); // 選択中の全体プリセット
  const [detailWholePreset, setDetailWholePreset] = useState<DetailWhole>(); // 選択中の全体プリセット[id]
  const [selectedTimePreset, setSelectedTimePreset] = useState<TimeSet>(); // 選択中の時間プリセット
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [wholeName, setWholeName] = useState<string>("");
  const [wakeupTime, setWakeupTime] = useState<string>("");

  const handleScheduleCreate = async () => {
    // スケジュール　作成
  

   const scheduleNew = {
    userId: session?.user.id,
    wholeSet: {
      name: wholeName,
      itemid: detailWholePreset?.whole.itemId,
      timeId: selectedTimePreset?.time.timeId,
        items: detailWholePreset?.whole.itemSet.map((item) => ({
          itemId: item.task ? item.task.itemId : item.folder?.itemId,
          select: 0,
        })),},};
        console.log(scheduleNew);
    try {
      const res = await axios.post("/api/schedule/new", scheduleNew);
      console.log(res.data);
    } catch (error) { }
  };

  const handleSortUp = (index: number) => {
    // タスクフォルダ並び替え　↑
    // スケジュール内のタスクフォルダを並び替える itemSets // TODO
    // 全体プリセットで仮実装済
    setWholeName("カスタム");
    setDetailWholePreset((prev) => {
      if (!prev) return undefined; // データが無ければreturn

      const updatedItemSet = [...prev.whole.itemSet]; // 現在の配列を取得

      if (index > 0 && index < updatedItemSet.length) {
        [updatedItemSet[index - 1], updatedItemSet[index]] = [
          updatedItemSet[index],
          updatedItemSet[index - 1],
        ]; // 赤線解消できない // TODO
      }
      return {
        // 新しい配列を登録
        ...prev,
        whole: {
          ...prev.whole,
          itemSet: updatedItemSet,
        },
      };
    });
  };

  const calculateRemainingTime = () => {
    const [hours = 0, minutes = 0] = selectedTimePreset?.time.time.split(":").map(Number);
    const totalTimeInMinutes = hours * 60 + minutes;
    
    // アイテム内のタスクの合計時間を計算
    let taskTimeTotal = 0;
    detailWholePreset?.whole.itemSet.forEach(item => {
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

    setWakeupTime(`${wakeUpHour < 10 ? "0" : ""}${wakeUpHour}:${wakeUpMinute < 10 ? "0" : ""}${wakeUpMinute}`);
  }


  const handleSortDown = (index: number) => {
    // タスクフォルダ並び替え　↓
    // スケジュール内のタスクフォルダを並び替える itemSets // TODO
    // 全体プリセットで仮実装済
    setWholeName("カスタム");
    setDetailWholePreset((prev) => {
      if (!prev) return undefined; // データが無ければreturn

      const updatedItemSet = [...prev.whole.itemSet]; // 現在の配列を取得

      if (index >= 0 && index < updatedItemSet.length - 1) {
        // -1で合ってる？動作確認必須 // TODO
        [updatedItemSet[index], updatedItemSet[index + 1]] = [
          updatedItemSet[index + 1],
          updatedItemSet[index],
        ]; // 赤線解消できない // TODO
      }
      return {
        // 新しい配列を登録
        ...prev,
        whole: {
          ...prev.whole,
          itemSet: updatedItemSet,
        },
      };
    });
  };

  const handleDelete = (target) => {
    // タスクフォルダ削除 // 型定義 // TODO
    // スケジュール内のタスクフォルダを並び替える itemSets // TODO
    // 全体プリセットで仮実装済
    setDetailWholePreset((prev) => {
      if (!prev) return undefined; // データが無ければreturn

      return {
        // 新しい配列を登録
        ...prev,
        whole: {
          ...prev.whole,
          itemSet: prev.whole.itemSet.filter(
            // 該当itemを除く
            (item) => item !== target,
          ),
        },
      };
    });
  };

  const handleTaskAdd = () => {
    // タスク追加　既存プリセット
    setIsTaskModalOpen(true);
  };

  const handleTaskAdd2 = () => {
    // タスク追加　新規作成
    setIsTaskModalOpen2(true);
  };

  const handleFolderAdd = () => {
    // フォルダ追加　既存プリセット
    setIsFolderModalOpen(true);
  };

  const handleFolderAdd2 = () => {
    // フォルダ追加　新規作成
    setIsFolderModalOpen2(true);
  };

  const handleTaskSelect = (target) => {
    // タスク追加　既存プリセット　選択 // 型定義 // TODO
    setWholeName("カスタム");
    setDetailWholePreset((prev) => {
      if (!prev) return undefined; // データが無ければreturn

      return {
        // 新しい配列を登録
        ...prev,
        whole: {
          ...prev.whole,
          itemSet: [...prev.whole.itemSet, target], // 赤線解消できない // TODO
        },
      };
    });
    setIsTaskModalOpen(false);
  };

  const handleFolderSelect = (target) => {
    // フォルダ追加　既存プリセット　選択 // 型定義 // TODO
    setWholeName("カスタム");
    setDetailWholePreset((prev) => {
      if (!prev) return undefined; // データが無ければreturn

      return {
        // 新しい配列を登録
        ...prev,
        whole: {
          ...prev.whole,
          itemSet: [...prev.whole.itemSet, target], // 赤線解消できない // TODO
        },
      };
    });
    setIsFolderModalOpen(false);
  };

  const handleTaskAddCancel = () => {
    // タスク追加　既存プリセット　キャンセルボタン
    setIsTaskModalOpen(false);
    console.log("キャンセルしました");
  };

  const handleTaskAddCreate2 = () => {
    // タスク追加　新規作成　作成ボタン
    setIsTaskModalOpen2(false);
    // スケジュールにタスクを追加 // TODO
    console.log("作成しました");
  };

  const handleTaskAddCancel2 = () => {
    // タスク追加　新規作成　キャンセルボタン
    setIsTaskModalOpen2(false);
    console.log("キャンセルしました");
  };

  const handleFolderAddCancel = () => {
    // タスク追加　既存プリセット　キャンセルボタン
    setIsFolderModalOpen(false);
    console.log("キャンセルしました");
  };

  const handleFolderAddCreate2 = () => {
    // フォルダ追加　新規作成　作成ボタン
    setIsFolderModalOpen2(false);
    // スケジュールにタスクを追加 // TODO
    console.log("作成しました");
  };

  const handleFolderAddCancel2 = () => {
    // フォルダ追加　新規作成　キャンセルボタン
    setIsFolderModalOpen2(false);
    console.log("キャンセルしました");
  };

  useEffect(() => {
    // アクセス時に1回実行
    const fetchPresets = async () => {
      if (!session?.user?.id) {
        setIsLoading(false); // セッションが無ければ何も表示しない
        return;
      }

      try {
        const [wholeResponse, timeResponse, folderResponse, taskResponse, scheduleResponse] =
          await Promise.all([
            axios.get<WholeApiResponse>(
              `/api/presets/whole?userId=${session.user.id}`, // 全体プリセット一覧 get
            ),
            axios.get<TimeApiResponse>(
              `/api/presets/time?userId=${session.user.id}`, // 時間プリセット一覧 get
            ),
            axios.get<FolderApiResponse>(
              `/api/presets/folder?userId=${session.user.id}`, // フォルダプリセット一覧 get
            ),
            axios.get<TaskApiResponse>(
              `/api/presets/task?userId=${session.user.id}`, // タスクプリセット一覧 get
            ),
            axios.get(`/api/schedule?userId=${session.user.id}`)
          ]);
        

        if (scheduleResponse.data.wholeSet) {
          setDetailWholePreset(scheduleResponse.data.wholeSet); // 全体プリセット[id] 登録
          setWholeName(scheduleResponse.data.wholeSet.whole.name);
        }

        if (wholeResponse.data?.wholeSets) {
          setWholePresets(wholeResponse.data.wholeSets); // 全体プリセット一覧　登録
          if (wholeResponse.data.wholeSets.length > 0) {
            setValueWhole(scheduleResponse.data.wholeSet.whole.itemId); // 選択中
          }
        }
        if (timeResponse.data?.timeSets) {
          setTimePresets(timeResponse.data.timeSets); // 時間プリセット[id]　登録
          if (timeResponse.data.timeSets.length > 0) {
            setSelectedTimePreset(scheduleResponse.data.wholeSet.whole.timeSet); // 選択中
            setValueTime(scheduleResponse.data.wholeSet.whole.timeSet.time.timeId); // 選択中
          }
        }

        if (folderResponse.data?.folderSets) {
          setFolderPresets(folderResponse.data.folderSets); // フォルダプリセット　登録
          // if (folderResponse.data.folderSets.length > 0) {
          //   const firstFolderPreset = folderResponse.data.folderSets[0];
          //   if (firstFolderPreset?.folder !== undefined) {
          //     setSelectedFolderPreset(firstFolderPreset); // 選択中   // いらないかも？要検討 // TODO
          //     setValueFolder(firstFolderPreset.folder.itemId); // 選択中
          //   }
          // }
        }

        if (taskResponse.data?.taskSets) {
          setTaskPresets(taskResponse.data.taskSets); // タスクプリセット　登録
        }
      } catch (err) {
        console.error("Error fetching presets:", err);
      } finally {
        setIsLoading(false); // データの取得が完了したらローディング状態を解除
      }
    };

    void fetchPresets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  useEffect(() => {
    // 全体プリセットが変更されたら1回実行
    const fetchPresets = async () => {
      if (!session?.user?.id || isFirst) {
        setIsFirst(false);
        setIsLoading(false); // セッションが無ければ何も表示しない
        return;
      }
      try {
        const detailWholeResponse = await axios.get<DetailWholeApiResponse>(
          `/api/presets/whole/${selectedWholePreset?.itemId}?userId=${session.user.id}`, // 全体プリセット[id] get
        );
        if (detailWholeResponse.data?.wholeSet) {
          setDetailWholePreset(detailWholeResponse.data.wholeSet); // 全体プリセット[id] 登録
          setWholeName(detailWholeResponse.data.wholeSet.whole.name);
        }
        const firstTimePreset = detailWholeResponse.data.wholeSet.whole.timeSet; // 時間プリセット
        if (firstTimePreset !== undefined) {
          setSelectedTimePreset(firstTimePreset); // 選択中
          setValueTime(firstTimePreset.time.timeId); // 選択中
        }
      } catch (err) {
        console.error("Error fetching presets:", err);
      }
    };
    void fetchPresets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWholePreset]);

  const handleWholePresetSelect = (id: string) => {
    // 選択中の全体プリセットが変更されたら
    const selectedPreset = wholePresets.find((preset) => preset.itemId === id);
    if (selectedPreset) {
      setSelectedWholePreset({
        name: selectedPreset.name,
        itemId: selectedPreset.itemId,
      });
      setWholeName(selectedPreset.name);
      setValueWhole(id);
      setOpenWhole(false);
    }
  };

  const handleTimePresetSelect = (id: string) => {
    // 選択中の時間プリセットが変更されたら
    const selectedPreset = timePresets.find(
      (preset) => preset.time.timeId === id,
    );
    if (selectedPreset) {
      setSelectedTimePreset(selectedPreset);
      setValueTime(id);
      setOpenTime(false);
      setWholeName("カスタム");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mx-auto h-svh max-w-md bg-slate-50 pt-5 text-center font-mPlus">
      <div className="mx-auto w-[80%] h-[660px] rounded-xl border-4 border-color-all bg-white">
        <div className="flex justify-center rounded-t-lg bg-color-all py-3 text-xl">
          <Link href="/home">
            <Image
              src="/image/back.svg"
              alt="Backicon"
              width={25}
              height={25}
              style={{
                width: '25px',
                height: 'auto',
            }}
              className="mt-2"
            />
          </Link>
          <Image
            src="/image/inventory.svg"
            alt="Backicon"
            width={25}
            height={25}
            style={{
              width: '25px',
              height: 'auto',
          }}
            className="mr-3"
          />

          <Popover open={openWhole} onOpenChange={setOpenWhole}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openWhole}
                className="w-[170px] py-5 text-lg mr-16"
              >
                <div className="ml-5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {wholeName
                    ? wholeName
                    : "未設定"}
                </div>
                <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="全体プリセットを検索" />
                <CommandList>
                  <CommandEmpty>見つかりません</CommandEmpty>
                  <CommandGroup>
                    {wholePresets.map((preset) => (
                      <CommandItem
                        key={preset.itemId}
                        value={preset.name}
                        onSelect={() => handleWholePresetSelect(preset.itemId)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueWhole === preset.itemId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {preset.name}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="bg-color-time pb-0.5 pt-3 text-xl">
          <Image
            src="/image/Timeicon.svg"
            alt="Time"
            width={27}
            height={27}
            style={{
              width: '27px',
              height: 'auto',
          }}
            className="fixed left-16 top-24 ml-2 mt-3"
          />
          <Popover open={openTime} onOpenChange={setOpenTime}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openTime}
                className="w-[170px] py-5 text-lg"
              >
                <div className="ml-5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {selectedTimePreset
                    ? selectedTimePreset.time.name
                    : "未設定"}
                </div>
                <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="時間プリセットを検索" />
                <CommandList>
                  <CommandEmpty>見つかりません</CommandEmpty>
                  <CommandGroup>
                    {timePresets.map((preset) => (
                      <CommandItem
                        key={preset.time.timeId}
                        value={preset.time.name}
                        onSelect={() =>
                          handleTimePresetSelect(preset.time.timeId)
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueTime === preset.time.timeId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {preset.time.name}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="mx-2 mb-2 mt-3 bg-white py-3 text-3xl font-extrabold">
            {selectedTimePreset?.time.time}
          </div>
        </div>
        <ScrollArea className="h-[380px]">
          {detailWholePreset ? (
            detailWholePreset.whole?.itemSet?.map((item, index) => (
              <div key={index}>
                {item.task && (
                  <TaskPreset
                    index={index}
                    name={item.task.name}
                    options={item.task.options}
                    task={item} // 変更した　動作要確認 // TODO
                    handleDelete={handleDelete}
                    handleSortUp={handleSortUp}
                    handleSortDown={handleSortDown}
                  />
                )}
                {item.folder && (
                  <FolderPreset
                    index={index}
                    folder={item} // 変更した　動作要確認 // TODO
                    folderPresets={folderPresets}
                    handleDelete={handleDelete}
                    handleSortUp={handleSortUp}
                    handleSortDown={handleSortDown}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="mt-28 text-gray-500">
              下の＋ボタンから<br />タスクかフォルダを追加してください</p>
          )}
        </ScrollArea>

        <div className="mt-3 flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <PlusCircle
                style={{ width: "50px", height: "50px" }}
                color={"#31D6CB"}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex space-x-4 p-4">
              <div>
                <DropdownMenuLabel>タスクの作成</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleTaskAdd}>
                  既存プリセットから
                </DropdownMenuItem>
              </div>
              <div>
                <DropdownMenuLabel>フォルダの作成</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleFolderAdd}>
                  既存プリセットから
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>追加するタスクを選んでください</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {taskPresets.map((taskSet, index) => (
                <div key={index} onClick={() => handleTaskSelect(taskSet)}>
                  <TaskPreset
                    index={index}
                    name={taskSet.task.name}
                    options={taskSet.task.options}
                    task={taskSet} // 変更した 要確認 // TODO
                    handleDelete={handleDelete}
                    handleSortUp={handleSortUp}
                    handleSortDown={handleSortDown}
                    isDelete={true}
                  />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isTaskModalOpen2} onOpenChange={setIsTaskModalOpen2}>
          <DialogContent className="w-[90%] rounded-xl">
            <DialogHeader>
              <DialogTitle>
                <Input
                  value={tempName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTempName(e.target.value)
                  }
                  className="mt-4 text-center text-gray-700"
                />
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="pulldown" className="mt-2">
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="pulldown">プルダウン</TabsTrigger>
                <TabsTrigger value="static">固定値</TabsTrigger>
              </TabsList>
              <TabsContent value="pulldown" className="h-[150px]">
                <ScrollArea>
                  <div className="mb-3 flex items-center justify-center">
                    <Input
                      type="text"
                      value={options1}
                      onChange={(e) => setOptions1(e.target.value)}
                      className="mr-7 w-36 text-center"
                    />
                    <Input
                      type="number"
                      value={minutes1}
                      onChange={(e) => setMinutes1(Number(e.target.value))}
                      className="w-16 text-center"
                    />
                    <p>min</p>
                  </div>
                  <div className="mb-3 flex items-center justify-center">
                    <Input
                      type="text"
                      value={options2}
                      onChange={(e) => setOptions2(e.target.value)}
                      className="mr-7 w-36 text-center"
                    />
                    <Input
                      type="number"
                      value={minutes2}
                      onChange={(e) => setMinutes2(Number(e.target.value))}
                      className="w-16 text-center"
                    />
                    <p>min</p>
                  </div>
                  <div className="mb-3 flex items-center justify-center">
                    <Input
                      type="text"
                      value={options3}
                      onChange={(e) => setOptions3(e.target.value)}
                      className="mr-7 w-36 text-center"
                    />
                    <Input
                      type="number"
                      value={minutes3}
                      onChange={(e) => setMinutes3(Number(e.target.value))}
                      className="w-16 text-center"
                    />
                    <p>min</p>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="static" className="h-[150px]">
                <div className="flex h-40 items-center justify-center">
                  <Input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    className="w-24 text-center"
                  />
                  <p>min</p>
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-auto flex justify-around">
              <Button onClick={handleTaskAddCancel2} className="bg-gray-600">
                キャンセル
              </Button>
              <Button
                className="bg-darkBlue hover:bg-blue-900"
                onClick={handleTaskAdd2}
                disabled={!tempName} // tempNameが空の場合はボタンを無効化
              >
                作成
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isFolderModalOpen} onOpenChange={setIsFolderModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>追加するフォルダを選んでください</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {folderPresets.map((folderSet, index) => (
                <div key={index} onClick={() => handleFolderSelect(folderSet)}>
                  <FolderPreset
                    index={index}
                    folder={folderSet} // 変更した 要確認 // TODO
                    folderPresets={folderPresets}
                    handleDelete={handleDelete}
                    handleSortUp={handleSortUp}
                    handleSortDown={handleSortDown}
                    isDelete={true}
                  />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 transform">
        <p className="mt-3 text-teal-500">間に合う時刻</p>
        { wakeupTime === "" ?
       <Button className="flex mx-auto bg-slate-500" onClick={calculateRemainingTime}>クリック</Button>
        :
        <p className="text-3xl font-extrabold text-red-600">{wakeupTime}</p>
}
          <Link href="/home">
          <Button className="my-2 w-36 bg-color-all py-6 text-2xl hover:bg-teal-500" onClick={handleScheduleCreate}>
            設定
          </Button>
          </Link>
 
      </div>
    </div>
  );
}
