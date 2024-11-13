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
  message: string;
  wholeSets: WholeSet[];
};

type WholeSet = {
  name: string;
  itemId: string;
};

type TimeApiResponse = {
  message: string;
  timeSets: TimeSet[];
};

type TimeSet = {
  time: {
    name: string;
    timeId: string;
    time: string;
  };
};

type FolderApiResponse = {
  message: string;
  folderSets: FolderSet[];
};

type TaskApiResponse = {
  message: string;
  taskSets: TaskSet[];
};

type TaskSet = {
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

type FolderSet = {
  folder: {
    name: string;
    itemId: string;
    tasks: {
      name: string;
      itemId: string;
      isStatic: boolean;
      options: {
        name: string;
        time: number;
      }[];
    }[];
  };
};

type DetailedWholeApiResponse = {
  message: string; // 成功
  wholeSet: {
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
            name: string; // タスクプリセット　名前
            itemId: string; // タスクプリセット　ID
            isStatic: boolean; // 固定値かどうか
            options: {
              // プルダウン
              name: string; // 名前
              time: number; // 時間
            }[];
          }[];
        };
      }[];
    };
  };
};

export default function Schedule() {
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState("");
  const [openFolder, setOpenFolder] = useState(false);
  const [valueFolder, setValueFolder] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const [valueAll, setValueAll] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState(null);
  const [folderData, setFolderData] = useState(null);

  const { data: session, status } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [tempName, setTempName] = useState<string>(""); // 入力用の一時的な名前
  const [options1, setOptions1] = useState("デフォルト"); // プルダウン
  const [options2, setOptions2] = useState("");
  const [options3, setOptions3] = useState("");
  const [minutes1, setMinutes1] = useState(0); // 分
  const [minutes2, setMinutes2] = useState(0); // 分
  const [minutes3, setMinutes3] = useState(0); // 分
  const [minutes, setMinutes] = useState(0);
  const [wholePresets, setWholePresets] = useState<WholeSet[]>([]);
  const [selectedWholePreset, setSelectedWholePreset] = useState<WholeSet>();
  const [isLoading, setIsLoading] = useState(true);
  const [timePresets, setTimePresets] = useState<TimeSet[]>([]);
  const [selectedTimePreset, setSelectedTimePreset] = useState<TimeSet>();
  const [detailedWholePreset, setDetailedWholePreset] =
    useState<DetailedWholeApiResponse>();
  const [folderPresets, setFolderPresets] = useState<FolderSet[]>([]);
  const [selectedFolderPreset, setSelectedFolderPreset] = useState<FolderSet>();
  const [taskPresets, setTaskPresets] = useState<TaskSet[]>([]);

  const handleCancel = () => {
    setIsModalOpen2(false);
  };

  const handleCreate = () => {
    console.log("作成しました");
    setIsModalOpen2(false);
  };

  const handleSortUp = (index) => {
      setDetailedWholePreset((prev) => {
        if (!prev) return undefined;
    
        const updatedItemSet = [...prev.wholeSet.whole.itemSet];
    
        if (index > 0 && index < updatedItemSet.length) {
          [updatedItemSet[index - 1], updatedItemSet[index]] = [updatedItemSet[index], updatedItemSet[index - 1]];
        }
    
        return {
          ...prev,
          wholeSet: {
            ...prev.wholeSet,
            whole: {
              ...prev.wholeSet.whole,
              itemSet: updatedItemSet,
            },
          },
          message: prev.message || "",
        };
      });
    };

    const handleSortDown = (index) => {
      setDetailedWholePreset((prev) => {
        if (!prev) return undefined;
    
        const updatedItemSet = [...prev.wholeSet.whole.itemSet];

        if (index >= 0 && index < updatedItemSet.length) {
          [updatedItemSet[index], updatedItemSet[index + 1]] = [updatedItemSet[index + 1], updatedItemSet[index]];
        }
    
        return {
          ...prev,
          wholeSet: {
            ...prev.wholeSet,
            whole: {
              ...prev.wholeSet.whole,
              itemSet: updatedItemSet,
            },
          },
          message: prev.message || "",
        };
      });
    };

  const handleDelete = (task) => {
    console.log(task);
    setDetailedWholePreset((prev) => {
      if (!prev) return undefined;
  
      return {
        ...prev,
        wholeSet: {
          ...prev.wholeSet,
          whole: {
            ...prev.wholeSet.whole,
            itemSet: prev.wholeSet.whole.itemSet.filter(
              (item) => item !== task
            ),
          },
        },
        message: prev.message || "",
      };
    });
  };

  const handleTaskPresetSelection = () => {
    setIsModalOpen(true);
  };

  const handleTaskPresetNew = () => {
    setIsModalOpen2(true);
  };

  const handleFolderPresetSelection = () => {
    setIsModalOpen3(true);
  };

  const handleFolderPresetNew = () => {
    setIsModalOpen4(true);
  };

  const handleTaskSelect = (taskSet) => {
    console.log(taskSet);
    setDetailedWholePreset((prev) => {
      if (!prev) return undefined;
  
      return {
        ...prev,
        wholeSet: {
          ...prev.wholeSet,
          whole: {
            ...prev.wholeSet.whole,
            itemSet: [...prev.wholeSet.whole.itemSet, taskSet],
          },
        },
        message: prev.message || "",
      };
    });
    
    setIsModalOpen(false);
  };
  

  const handleFolderSelect = (folderSet) => {
    console.log(folderSet);
    setDetailedWholePreset((prev) => {
      if (!prev) return undefined;
  
      return {
        ...prev,
        wholeSet: {
          ...prev.wholeSet,
          whole: {
            ...prev.wholeSet.whole,
            itemSet: [...prev.wholeSet.whole.itemSet, folderSet],
          },
        },
        message: prev.message || "",
      };
    });
    
    setIsModalOpen(false);
  };
  

  useEffect(() => {
    const fetchPresets = async () => {
      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const [wholeResponse, timeResponse, folderResponse, taskResponse] =
          await Promise.all([
            axios.get<WholeApiResponse>(
              `/api/presets/whole?userId=${session.user.id}`,
            ),
            axios.get<TimeApiResponse>(
              `/api/presets/time?userId=${session.user.id}`,
            ),
            axios.get<FolderApiResponse>(
              `/api/presets/folder?userId=${session.user.id}`,
            ),
            axios.get<TaskApiResponse>(
              `/api/presets/task?userId=${session.user.id}`,
            ),
          ]);
        setIsLoading(false);

        if (wholeResponse.data?.wholeSets) {
          setWholePresets(wholeResponse.data.wholeSets);
          if (wholeResponse.data.wholeSets.length > 0) {
            const firstPreset = wholeResponse.data.wholeSets[0];
            if (firstPreset !== undefined) {
              setSelectedWholePreset({
                name: firstPreset.name,
                itemId: firstPreset.itemId,
              });
              setValueAll(firstPreset.itemId);
              const detailedWholeResponse = await axios.get(
                `/api/presets/whole/${firstPreset.itemId}?userId=${session.user.id}`,
              );
              if (detailedWholeResponse.data) {
                setDetailedWholePreset(detailedWholeResponse.data);
                console.log(detailedWholeResponse.data);
              }
            }
          }
        }

        if (timeResponse.data?.timeSets) {
          setTimePresets(timeResponse.data.timeSets);
        }

        if (folderResponse.data?.folderSets) {
          setFolderPresets(folderResponse.data.folderSets);
          if (folderResponse.data.folderSets.length > 0) {
            const firstFolderPreset = folderResponse.data.folderSets[0];
            if (firstFolderPreset && firstFolderPreset.folder !== undefined) {
              setSelectedFolderPreset(firstFolderPreset);
              setValueFolder(firstFolderPreset.folder.itemId);
            }
          }
        }

        if (taskResponse.data?.taskSets) {
          setTaskPresets(taskResponse.data.taskSets);
        }
      } catch (err) {
        console.error("Error fetching presets:", err);
      }
    };

    fetchPresets();
  }, []);

  useEffect(() => {
    const fetchPresets = async () => {
      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }
      try {
        const detailedWholeResponse = await axios.get(
          `/api/presets/whole/${selectedWholePreset?.itemId}?userId=${session.user.id}`,
        );
        if (detailedWholeResponse.data) {
          setDetailedWholePreset(detailedWholeResponse.data);
          console.log(detailedWholeResponse.data);
        }
      } catch (err) {
        console.error("Error fetching presets:", err);
      }
    };
    fetchPresets();
  }, [selectedWholePreset]);

  useEffect(() => {
    const firstTimePreset = detailedWholePreset?.wholeSet.whole.timeSet;
    if (firstTimePreset !== undefined) {
      setSelectedTimePreset({
        time: {
          name: firstTimePreset.time.name,
          timeId: firstTimePreset.time.timeId,
          time: firstTimePreset.time.time,
        },
      });
      setValueTime(firstTimePreset.time.timeId);

      const firstFolderPreset =
        detailedWholePreset?.wholeSet.whole.itemSet.find(
          (item) => item.folder !== undefined,
        );
      if (firstFolderPreset && firstFolderPreset.folder) {
        setSelectedFolderPreset({
          folder: firstFolderPreset.folder,
        });
        console.log(firstFolderPreset.folder);
        setValueFolder(firstFolderPreset.folder.itemId);
      }
    }
  }, [detailedWholePreset]);

  const handleWholePresetSelect = (presetId) => {
    const selectedPreset = wholePresets.find(
      (preset) => preset.itemId === presetId,
    );
    if (selectedPreset) {
      setSelectedWholePreset({
        name: selectedPreset.name,
        itemId: selectedPreset.itemId,
      });
      setValueAll(presetId);
      setOpenAll(false);
    }
  };

  const handleTimePresetSelect = (presetId) => {
    const selectedPreset = timePresets.find(
      (preset) => preset.time.timeId === presetId,
    );
    if (selectedPreset) {
      setSelectedTimePreset({
        time: {
          name: selectedPreset.time.name,
          timeId: selectedPreset.time.timeId,
          time: selectedPreset.time.time,
        },
      });
      setValueTime(presetId);
      setOpenTime(false);
    }
  };

  const handleFolderPresetSelect = (presetId) => {
    const selectedPreset = folderPresets.find(
      (preset) => preset.folder.itemId === presetId,
    );
    if (selectedPreset) {
      setSelectedFolderPreset(selectedPreset);
      setValueFolder(presetId);
      setOpenFolder(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto h-svh max-w-md bg-slate-50 pt-5 text-center font-mPlus">
      <div className="mx-5 h-[660px] rounded-xl border-2 border-teal-400 bg-white">
        <p className="rounded-t-lg bg-teal-400 py-3 text-xl">
          <Link href="/home">
            <Image
              src="/image/Backicon.svg"
              alt="Backicon"
              width={25}
              height={25}
              className="fixed left-3 top-10 mx-5 mt-0.5"
            />
          </Link>
          <Image
            src="/image/Allicon.svg"
            alt="All"
            width={27}
            height={27}
            className="fixed left-16 top-10 ml-2"
          />
          <Popover open={openAll} onOpenChange={setOpenAll}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAll}
                className="w-[170px] py-5 text-lg"
              >
                <div className="ml-5">
                  {selectedWholePreset
                    ? selectedWholePreset.name
                    : "プリセットを選択"}
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
                            valueAll === preset.itemId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {preset.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </p>
        <p className="bg-pink-300 pb-0.5 pt-3 text-xl">
          <Image
            src="/image/Timeicon.svg"
            alt="Time"
            width={27}
            height={27}
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
                <div className="ml-5">
                  {selectedTimePreset
                    ? selectedTimePreset.time.name
                    : "プリセットを選択"}
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
                        {preset.time.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <p className="mx-2 mb-2 mt-3 bg-white py-3 text-3xl font-extrabold">
            {selectedTimePreset?.time.time}
          </p>
        </p>
        <ScrollArea className="h-[380px]">
        {detailedWholePreset ? (
          detailedWholePreset.wholeSet?.whole?.itemSet?.map((item, index) => (
            <div key={index}>
              {item.task && (
                <TaskPreset
                  index={index}
                  name={item.task.name}
                  itemId={item.task.itemId}
                  isStatic={item.task.isStatic}
                  options={item.task.options}
                  task={item}
                  handleDelete={handleDelete}
                  handleSortUp={handleSortUp}
                  handleSortDown={handleSortDown}
                />
              )}
              {item.folder && (
                <FolderPreset
                  index={index}
                  folder={item}
                  openFolder={openFolder}
                  setOpenFolder={setOpenFolder}
                  valueFolder={valueFolder}
                  setValueFolder={setValueFolder}
                  selectedFolderPreset={selectedFolderPreset}
                  setSelectedFolderPreset={setSelectedFolderPreset}
                  folderPresets={folderPresets}
                  setFolderPresets={setFolderPresets}
                  handleDelete={handleDelete}
                  handleSortUp={handleSortUp}
                  handleSortDown={handleSortDown}
                />
              )}
            </div>
          ))
        ) : (
          <p>Loading tasks and folders...</p>
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
          <DropdownMenuItem onClick={handleTaskPresetSelection}>
            既存プリセットから
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleTaskPresetNew}>
            新規作成
          </DropdownMenuItem>
        </div>
        <div>
          <DropdownMenuLabel>フォルダの作成</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleFolderPresetSelection}>
            既存プリセットから
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleFolderPresetNew}>
            新規作成
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>追加するタスクを選んでください</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {taskPresets.map((taskSet, index) => (
                <div key={index} onClick={() => handleTaskSelect(taskSet)}>
                <TaskPreset
                  name={taskSet.task.name}
                  itemId={taskSet.task.itemId}
                  isStatic={taskSet.task.isStatic}
                  options={taskSet.task.options}
                  task={taskSet}
                  handleDelete={handleDelete}
                  handleSortUp={handleSortUp}
                  handleSortDown={handleSortDown}
                />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={isModalOpen2} onOpenChange={setIsModalOpen2}>
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
              <Button onClick={handleCancel} className="bg-gray-600">
                キャンセル
              </Button>
              <Button
                className="bg-darkBlue hover:bg-blue-900"
                onClick={handleCreate}
                disabled={!tempName} // newNameが空の場合はボタンを無効化
              >
                作成
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={isModalOpen3} onOpenChange={setIsModalOpen3}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>追加するフォルダを選んでください</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {folderPresets.map((folderSet, index) => (
                <div key={index} onClick={() => handleFolderSelect(folderSet)}>
                  <FolderPreset
                  index={index}
                  folder={folderSet}
                  openFolder={openFolder}
                  setOpenFolder={setOpenFolder}
                  valueFolder={valueFolder}
                  setValueFolder={setValueFolder}
                  selectedFolderPreset={selectedFolderPreset}
                  setSelectedFolderPreset={setSelectedFolderPreset}
                  folderPresets={folderPresets}
                  setFolderPresets={setFolderPresets}
                  handleDelete={handleDelete}
                  handleSortUp={handleSortUp}
                  handleSortDown={handleSortDown}
                />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 transform">
        <p className="mt-3 text-teal-500">間に合う時刻</p>
        <p className="text-3xl font-extrabold text-red-600">７：３０</p>
        <Link href="/home">
          <Button className="my-2 w-36 bg-teal-400 py-6 text-2xl hover:bg-teal-500">
            設定
          </Button>
        </Link>
      </div>
    </div>
  );
}
