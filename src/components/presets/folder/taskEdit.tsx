"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

interface EditFolderTaskProps {
  id: string;
  children: string;
  task: Task;
  handleGetFolder: () => void;
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

export default function EditFolderTask({
  id,
  children,
  task,
  handleGetFolder,
}: EditFolderTaskProps) {
  const [name, setName] = useState<string>(children); // 表示される名前
  const [newName, setNewName] = useState<string>(children); // 入力用の一時的な名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態
  const [isEditing, setIsEditing] = useState(false); // 編集状態

  const [activeTab, setActiveTab] = useState("pulldown");

  const [options1, setOptions1] = useState(""); // プルダウン
  const [options2, setOptions2] = useState("");
  const [options3, setOptions3] = useState("");
  const [minutes1, setMinutes1] = useState(0); // 分
  const [minutes2, setMinutes2] = useState(0); // 分
  const [minutes3, setMinutes3] = useState(0); // 分
  const [minutes, setMinutes] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState(task.select);

  const { data: session, status } = useSession();

  const handleSave = async () => {
    setName(newName);
    const taskData1 = {
      userId: session?.user.id,
      taskSet: {
        name: name,
        isStatic: false,
        select: selectedRadio,
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
        select: selectedRadio,
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
      console.log({ taskData1 });
    } catch (error) {}
    setDialogOpen(false);
    handleGetFolder();
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
    } catch (error) {}
    setDialogOpen(false);
    setIsDeleteDialogOpen(false);
    handleGetFolder();
  };

  const handleDialogOpen = () => {
    if (task.isStatic) {
      setActiveTab("static");
    }
    if (activeTab === "pulldown") {
      const options = task.options || []; // task.optionsがundefinedの場合でも空の配列を使用
      setMinutes1(options[0]?.time ?? 0);
      setMinutes2(options[1]?.time ?? 0);
      setMinutes3(options[2]?.time ?? 0);
      setOptions1(options[0]?.name ?? "デフォルト");
      setOptions2(options[1]?.name ?? "");
      setOptions3(options[2]?.name ?? "");
    } else {
      setMinutes(task.options[0]?.time ?? 0);
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
      <div className="flex w-full items-center justify-start text-xl text-black">
        <Description
          color="#FFA660"
          style={{ width: "35px", height: "35px" }}
        />
        <DialogTrigger onClick={handleDialogOpen}>【{name}】</DialogTrigger>
      </div>
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
        >
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="pulldown">プルダウン</TabsTrigger>
            <TabsTrigger value="static">固定値</TabsTrigger>
          </TabsList>
          <TabsContent value="pulldown" className="h-[170px]">
            <RadioGroup
              defaultValue={selectedRadio.toString()}
              onValueChange={(value) => setSelectedRadio(Number(value))} // 選択状態を更新
            >
              {task.options.map((option, index) => (
                <div key={index} className="flex items-center justify-center">
                  <RadioGroupItem value={String(index)} id={String(index)} />
                  <Label htmlFor={String(index)}>
                    <div className="px-4 flex items-center justify-center">
                      <Input
                        type="text"
                        value={
                          index === 0
                            ? options1
                            : index === 1
                              ? options2
                              : options3
                        }
                        onChange={(e) =>
                          index === 0
                            ? setOptions1(e.target.value)
                            : index === 1
                              ? setOptions2(e.target.value)
                              : setOptions3(e.target.value)
                        }
                        className="mr-7 w-36 text-center"
                      />
                      <Input
                        type="number"
                        value={
                          index === 0
                            ? minutes1
                            : index === 1
                              ? minutes2
                              : minutes3
                        }
                        onChange={(e) =>
                          index === 0
                            ? setMinutes1(Number(e.target.value))
                            : index === 1
                              ? setMinutes2(Number(e.target.value))
                              : setMinutes3(Number(e.target.value))
                        }
                        className="w-16 text-center"
                      />
                      <p>min</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-2 flex justify-around">
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
