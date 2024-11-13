"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";
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
  taskResponse: TaskApiResponse;
}

type FolderSet = {
  folder: {
    name: string;
    itemId: string;
    tasks: {
      task: {
        name: string;
        itemId: string;
        isStatic: boolean;
        options: {
          name: string;
          time: number;
        }[];
      };
    }[];
  };
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

type TaskApiResponse = {
  message: string;
  taskSets: TaskSet[];
};

export default function NewFolderTask({ item, taskResponse }: taskNewProps) {
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

  const handlePullDownTaskCreate = async () => {
    const taskData = {
      userId: "cm390e361000010avus2xru9v",
      taskSet: {
        name: name,
        isStatic: false,
        select: 0,
        options: [
          { name: options1, time: minutes1 },
          { name: options2, time: minutes2 },
          { name: options3, time: minutes3 },
        ],
      },
    };

    try {
      const res = await axios.post("/api/presets/task/new", taskData);
      setTaskResponse(res.data);
      console.log(res.data);
    } catch (error) {}
    handleCancel();
    setIsDialogOpen(false);
  };

  const handleTaskAdd = () => setIsDialogOpen(true);
  const handleTaskAdd2 = () => setIsDialogOpen2(true);

  const handleTaskSelect = (target: TaskSet) => {
    // PUT // TODO
    console.log(target)
    setFolderPreset((prev) => {
      if (!prev) return undefined;
  
      return {
        ...prev,
        folder: {
          ...prev.folder,
          tasks: [...prev.folder.tasks, target],
        },
      };
    });
    console.log(folderPreset);
    setIsDialogOpen2(false);
  };

  return (
    <div>
      <div className="mt-3 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <PlusCircle color="#FFA660" style={{ width: "50px", height: "50px" }} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex space-x-4 p-4">
            <div>
              <DropdownMenuLabel>タスクの作成</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleTaskAdd}>新規作成</DropdownMenuItem>
              <DropdownMenuItem onClick={handleTaskAdd2}>既存プリセットから</DropdownMenuItem>
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
          <Tabs defaultValue="pulldown" className="mt-2">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="pulldown">プルダウン</TabsTrigger>
              <TabsTrigger value="static">固定値</TabsTrigger>
            </TabsList>
            <TabsContent value="pulldown" className="h-[150px]">
              <ScrollArea>
                {[{ options: options1, minutes: minutes1, setOptions: setOptions1, setMinutes: setMinutes1 },
                  { options: options2, minutes: minutes2, setOptions: setOptions2, setMinutes: setMinutes2 },
                  { options: options3, minutes: minutes3, setOptions: setOptions3, setMinutes: setMinutes3 }]
                  .map((opt, index) => (
                  <div key={index} className="mb-3 flex items-center justify-center">
                    <Input type="text" value={opt.options} onChange={(e) => opt.setOptions(e.target.value)} className="mr-7 w-36 text-center" />
                    <Input type="number" value={opt.minutes} onChange={(e) => opt.setMinutes(Number(e.target.value))} className="w-16 text-center" />
                    <p>min</p>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="static" className="h-[150px]">
              <div className="flex h-40 items-center justify-center">
                <Input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="w-24 text-center" />
                <p>min</p>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-auto flex justify-around">
            <Button className="bg-darkBlue hover:bg-blue-900" onClick={handlePullDownTaskCreate} disabled={!name}>
              作成
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isDialogOpen2} onOpenChange={setIsDialogOpen2}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>追加するタスクを選んでください</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {taskResponse.taskSets.map((taskSet, index) => (
              <div key={index} className="flex w-full items-center justify-start text-xl text-black" onClick={() => handleTaskSelect(taskSet)}>
                <Description color="#FFA660" style={{ width: "35px", height: "35px" }} />
                【{taskSet.task.name}】
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
