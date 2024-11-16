"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Description from "~/components/svgs/description";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface EditTaskProps {
  id: string;
  children: string;
  task: Task;
  handleTaskGet: () => void;
}

type Task = {
  // タスクプリセット　中身
  name: string;
  itemId: string;
  isStatic: boolean;
  select: number;
  options: {
    name: string;
    time: number;
  }[];
};

export default function EditTask({
  id,
  children,
  task,
  handleTaskGet,
}: EditTaskProps) {
  const [name, setName] = useState<string>(children); // 表示される名前
  const [newName, setNewName] = useState<string>(children); // 入力用の一時的な名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態
  const [isEditing, setIsEditing] = useState(false); // 編集状態

  const [activeTab, setActiveTab] = useState("static");

  const [options1, setOptions1] = useState(task.options[0]?.name ?? ""); // プルダウン
  const [options2, setOptions2] = useState(task.options[1]?.name ?? "");
  const [options3, setOptions3] = useState(task.options[2]?.name ?? "");
  const [minutes1, setMinutes1] = useState(task.options[0]?.time ?? 0); // 分
  const [minutes2, setMinutes2] = useState(task.options[1]?.time ?? 0); // 分
  const [minutes3, setMinutes3] = useState(task.options[2]?.time ?? 0); // 分

  const [minutes, setMinutes] = useState(task.options[0]?.time);

  const { data: session, status } = useSession();

  const handleSave = async () => {
    setName(newName);
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
        options: [
          {
            time: minutes,
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
          `/api/presets/task/${id}?userId=${session.user.id}`,
          taskData1,
        );
      } else {
        const res = await axios.put(
          `/api/presets/task/${id}?userId=${session.user.id}`,
          taskData2,
        );
      }
    } catch (error) { }
    setDialogOpen(false);
    handleTaskGet();
  };

  const handleDelete = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      const response = await axios.delete(
        `/api/presets/task/${id}?userId=${session.user.id}`,
      );
      console.log(response);
    } catch (error) { }
    setDialogOpen(false);
    setIsDeleteDialogOpen(false);
    handleTaskGet();
  };

  const handleDialogOpen = () => {
    if (task.isStatic === false) {
      setActiveTab("pulldown");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //エンターキーをおしたら編集中状態を解除
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const handleTouchOutside = () => setIsEditing(false);
    if (isEditing) {
      document.addEventListener("touchstart", handleTouchOutside);
    } else {
      document.removeEventListener("touchstart", handleTouchOutside);
    }
    return () => document.removeEventListener("touchstart", handleTouchOutside);
  }, [isEditing]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          setNewName(name); // ダイアログが閉じた時に tempName を元の name にリセット
        }
      }}
    >
      <DialogTrigger
        className="flex w-full items-center justify-start text-xl text-black font-normal"
        onClick={handleDialogOpen}
      >
        <Description
          color="#FFA660"
          style={{ width: "35px", height: "35px" }}
        />
        &nbsp;{name}
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? (
              <Input
                value={newName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewName(e.target.value)
                }
                onKeyDown={handleKeyDown} // Enter キーを押したときに編集を終了
                autoFocus
                className="mt-2 text-center text-gray-700"
              />
            ) : (
              <Button
                variant="ghost"
                className="mt-4 w-full bg-color-task text-left text-black"
                onClick={() => setIsEditing(true)}
              >
                {newName || "新しい名前を入力"}
              </Button>
            )}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className=""
        >
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="static">固定値</TabsTrigger>
            <TabsTrigger value="pulldown">プルダウン</TabsTrigger>
          </TabsList>
          <TabsContent value="pulldown" className="h-[150px]">
            <div className="mb-2 flex items-center justify-center">
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
            <div className="mb-2 flex items-center justify-center">
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
            <div className="mb-2 flex items-center justify-center">
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
            <div className="mt-auto flex justify-around">
              <Button
                className="bg-red-600"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                削除
              </Button>
              <Button
                className="bg-darkBlue hover:bg-blue-900"
                onClick={handleSave}
                disabled={!name || !options1 || !options2 || !options3}
              >
                変更
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="static" className="h-[150px]">
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
                className="bg-red-600"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                削除
              </Button>
              <Button
                className="bg-darkBlue hover:bg-blue-900"
                onClick={handleSave}
                disabled={!newName} // newNameが空の場合はボタンを無効化
              >
                変更
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
      {/* 削除確認ダイアログ */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>確認</DialogTitle>
            <DialogDescription className="pt-5">
              このタスクを削除しますか？
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button
              className="mr-4 bg-gray-600"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button className="bg-red-600 text-white" onClick={handleDelete}>
              削除
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
