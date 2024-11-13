"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PlusCircle from "~/components/svgs/plusCircle";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function NewTask() {
  const [name, setName] = useState<string>(""); // 表示される名前
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態
  const [options1, setOptions1] = useState("デフォルト"); // プルダウン
  const [options2, setOptions2] = useState("");
  const [options3, setOptions3] = useState("");
  const [minutes1, setMinutes1] = useState(0); // 分
  const [minutes2, setMinutes2] = useState(0); // 分
  const [minutes3, setMinutes3] = useState(0); // 分
  const [minutes, setMinutes] = useState(0);
  const [taskResponse, setTaskResponse] = useState(null);
  const [activeTab, setActiveTab] = useState("pulldown");

  const { data: session, status } = useSession(); // セッション情報

  const handleCancel = () => {
    setDialogOpen(false);
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
    };
    const taskData2 = {
      userId: session?.user.id,
      taskSet: {
        name: name,
        isStatic: true,
        select: 0,
        options: [
          {
            time: minutes,
          },
        ],
      },
    };

    try {
      if (activeTab === "pulldown") {
        const res = await axios.post("/api/presets/task/new", taskData1);
      } else {
        const res = await axios.post("/api/presets/task/new", taskData2);
      }
    } catch (error) {}
    handleCancel();
    setDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="mt-4 flex items-center justify-center">
          <PlusCircle
            color="#FFA660"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            <Input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
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
          <Button
            className="bg-darkBlue hover:bg-blue-900"
            onClick={handleTaskCreate}
            disabled={!name} // newNameが空の場合はボタンを無効化
          >
            作成
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
