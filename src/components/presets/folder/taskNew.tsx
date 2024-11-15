"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Description from "~/components/svgs/description";
import PlusCircle from "~/components/svgs/plusCircle";
import { Button } from "~/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

type taskNewProps = {
  item: FolderSet;
  taskApiResponse: TaskApiResponse;
  handleGetFolder: () => void;
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

type TaskApiResponse = {
  message: string;
  taskSets: TaskSet[];
};

export type folderSetPutBody = {
  userId: string;
  folderSet: {
    name: string;
    items: (
      | taskIdInFolderPutData
      | taskPrefabInFolderPutData
      | taskInFolderPutData
    )[];
  };
};

export type taskIdInFolderPutData = {
  itemId: string;
  select: number;
};
export type taskPrefabInFolderPutData = {
  prefabId: string;
  select: number;
};
export type taskInFolderPutData = {
  taskSet: {
    name: string;
    isStatic: boolean;
    select: number;
    options: {
      name: string;
      time: number;
    }[];
  };
};

export default function NewFolderTask({
  item,
  taskApiResponse,
  handleGetFolder,
}: taskNewProps) {
  const [name, setName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const [options1, setOptions1] = useState("デフォルト");
  const [options2, setOptions2] = useState("");
  const [options3, setOptions3] = useState("");
  const [minutes1, setMinutes1] = useState(0);
  const [minutes2, setMinutes2] = useState(0);
  const [minutes3, setMinutes3] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [folderPreset, setFolderPreset] = useState<FolderSet>(item);
  const [taskResponse, setTaskResponse] = useState<TaskSet>();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("pulldown");

  const handleCancel = () => {
    setIsDialogOpen(false);
    setName("");
    setOptions1("");
    setOptions2("");
    setOptions3("");
    setMinutes(0);
    setMinutes1(0);
    setMinutes2(0);
    setMinutes3(0);
  };

  const handleTaskCreate = async () => {
    const taskData1 = {
      userId: session?.user.id,
      folderSet: {
        name: item.folder.name,
        items: [
          // map の結果を個別に構造化して追加
          ...item.folder.tasks.map((task) => ({
            itemId: task.task.itemId,
            select: task.task.select,
          })),
          {
            taskSet: {
              name: name,
              isStatic: false,
              select: 0,
              options: [
                {
                  name: options1,
                  time: minutes1,
                },
                {
                  name: options2,
                  time: minutes2,
                },
                {
                  name: options3,
                  time: minutes3,
                },
              ],
            },
          },
        ],
      },
    };
    const taskData2 = {
      userId: session?.user.id,
      folderSet: {
        name: item.folder.name,
        items: [
          // map の結果を個別に構造化して追加
          ...item.folder.tasks.map((task) => ({
            itemId: task.task.itemId,
            select: task.task.select,
          })),
          {
            taskSet: {
              name: name,
              isStatic: true,
              select: 0,
              options: [
                {
                  name: options1,
                  time: minutes1,
                },
              ],
            },
          },
        ],
      },
    };
    if (!session?.user?.id) {
      return;
    }
    try {
      if (activeTab === "pulldown") {
        const res = await axios.put(
          `/api/presets/folder/${item.folder.itemId}?userId=${session.user.id}`,
          taskData1,
        );
      } else {
        const res = await axios.put(
          `/api/presets/folder/${item.folder.itemId}?userId=${session.user.id}`,
          taskData2,
        );
      }
    } catch (error) {}
    handleCancel();
    setIsDialogOpen(false);
    handleGetFolder();
  };

  const handleTaskAdd = () => setIsDialogOpen(true);

  const handleTaskAdd2 = () => setIsDialogOpen2(true);

  const handleTaskSelect = async (target: TaskSet) => {
    console.log(target);
    const data = {
      userId: session?.user.id,
      folderSet: {
        name: item.folder.name,
        items: [
          // map の結果を個別に構造化して追加
          ...item.folder.tasks.map((task) => ({
            itemId: task.task.itemId,
            select: task.task.select,
          })),
          {
            prefabId: target.task.itemId,
            select: 0,
          },
        ],
      },
    };
    if (!session?.user?.id) {
      return;
    }
    const res = await axios.put(
      `/api/presets/folder/${item.folder.itemId}?userId=${session.user.id}`,
      data,
    );
    console.log(folderPreset);
    handleGetFolder();
    setIsDialogOpen2(false);
  };

  return (
    <div>
      <div className="mt-3 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <PlusCircle
              color="#FFA660"
              style={{ width: "50px", height: "50px" }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex space-x-4 p-4">
            <div>
              <DropdownMenuLabel>タスクの追加</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleTaskAdd}>
                新規作成
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTaskAdd2}>
                既存プリセットから
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-4 text-center text-gray-700"
              />
            </DialogTitle>
          </DialogHeader>
          <Tabs
            defaultValue="pulldown"
            onValueChange={(value) => setActiveTab(value)}
            className="mt-2"
          >
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="pulldown">プルダウン</TabsTrigger>
              <TabsTrigger value="static">固定値</TabsTrigger>
            </TabsList>
            <TabsContent value="pulldown" className="h-[150px]">
              {[
                {
                  options: options1,
                  minutes: minutes1,
                  setOptions: setOptions1,
                  setMinutes: setMinutes1,
                },
                {
                  options: options2,
                  minutes: minutes2,
                  setOptions: setOptions2,
                  setMinutes: setMinutes2,
                },
                {
                  options: options3,
                  minutes: minutes3,
                  setOptions: setOptions3,
                  setMinutes: setMinutes3,
                },
              ].map((opt, index) => (
                <div
                  key={index}
                  className="mb-2 flex items-center justify-center"
                >
                  <Input
                    type="text"
                    value={opt.options}
                    onChange={(e) => opt.setOptions(e.target.value)}
                    className="mr-7 w-36 text-center"
                  />
                  <Input
                    type="number"
                    value={opt.minutes}
                    onChange={(e) => opt.setMinutes(Number(e.target.value))}
                    className="w-16 text-center"
                  />
                  <p>min</p>
                </div>
              ))}
              <div className="mt-auto flex justify-around">
                <Button
                  className="bg-darkBlue hover:bg-blue-900"
                  onClick={handleTaskCreate}
                  disabled={!name || !options1 || !options2 || !options3}
                >
                  作成
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="static" className="h-[170px]">
              <div className="flex h-32 items-center justify-center">
                <Input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-24 text-center"
                />
                <p>min</p>
              </div>
              <div className="mt-auto flex justify-around">
                <Button
                  className="bg-darkBlue hover:bg-blue-900"
                  onClick={handleTaskCreate}
                  disabled={!name}
                >
                  作成
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      <Dialog open={isDialogOpen2} onOpenChange={setIsDialogOpen2}>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle>追加するタスクを選んでください</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {taskApiResponse.taskSets.map((taskSet, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-start text-xl text-black"
                onClick={() => handleTaskSelect(taskSet)}
              >
                <Description
                  color="#FFA660"
                  style={{ width: "35px", height: "35px" }}
                />
                【{taskSet.task.name}】
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
