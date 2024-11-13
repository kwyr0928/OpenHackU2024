"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
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
  children: string;
  id:string;
  isStatic:boolean;
  option:string;
}

export default function EditTask({ children }: EditTaskProps) {
  const [name, setName] = useState<string>(children); // 表示される名前
  const [newName, setNewName] = useState<string>(children); // 入力用の一時的な名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態
  const [isEditing, setIsEditing] = useState(false); // 編集状態

  const [number, setNumber] = useState<number>(0);

  const [options1, setOptions1] = useState("デフォルト"); // プルダウン
  const [options2, setOptions2] = useState("");
  const [options3, setOptions3] = useState("");
  const [minutes1, setMinutes1] = useState(0); // 分
  const [minutes2, setMinutes2] = useState(0); // 分
  const [minutes3, setMinutes3] = useState(0); // 分
  const [minutes, setMinutes] = useState(0);

  const handleSave = () => {
    // データベースに保存
    setName(newName);
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    //データベースから削除
    setDialogOpen(false);
    setIsDeleteDialogOpen(false);

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
      <DialogTrigger className="flex items-center justify-start w-full text-xl text-black">
          <Description
            color='#FFA660'
            style={{ width: "35px", height: "35px" }}
          />
          【{name}】
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
                onBlur={handleSave}
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
        <Tabs defaultValue="pulldown" className="">
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
