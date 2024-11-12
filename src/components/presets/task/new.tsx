"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import PlusCircle from "~/components/svgs/plusCircle";

export default function NewTask() {
  const [name, setName] = useState<string>(); // 表示される名前
  const [tempName, setTempName] = useState<string>(""); // 入力用の一時的な名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態
  const [options1, setOptions1] = useState("デフォルト"); // プルダウン
  const [options2, setOptions2] = useState("");
  const [options3, setOptions3] = useState("");
  const [minutes1, setMinutes1] = useState(0); // 分
  const [minutes2, setMinutes2] = useState(0); // 分
  const [minutes3, setMinutes3] = useState(0); // 分
  const [minutes, setMinutes] = useState(0);

  const handleSave = () => {
    // データベースに保存
    setName(tempName);
    setDialogOpen(false);
  };

  const handleCancel = async () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
      <div className="mt-4 flex items-center justify-center">
          <PlusCircle
            color='#FFA660'
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      </DialogTrigger>
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
              <div className="flex items-center justify-center mb-3">
                <Input
                  type="text"
                  value={options1}
                  onChange={(e) => setOptions1(e.target.value)}
                  className="w-36 text-center mr-7"
                />
                <Input
                  type="number"
                  value={minutes1}
                  onChange={(e) => setMinutes1(Number(e.target.value))}
                  className="w-16 text-center"
                />
                <p>min</p>
              </div>
              <div className="flex items-center justify-center mb-3">
                <Input
                  type="text"
                  value={options2}
                  onChange={(e) => setOptions2(e.target.value)}
                  className="w-36 text-center mr-7"
                />
                <Input
                  type="number"
                  value={minutes2}
                  onChange={(e) => setMinutes2(Number(e.target.value))}
                  className="w-16 text-center"
                />
                <p>min</p>
              </div>
              <div className="flex items-center justify-center mb-3">
                <Input
                  type="text"
                  value={options3}
                  onChange={(e) => setOptions3(e.target.value)}
                  className="w-36 text-center mr-7"
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
            onClick={handleCancel}
            className="bg-gray-600"
            
          >
            キャンセル
          </Button>
          <Button
            className="bg-darkBlue hover:bg-blue-900"
            onClick={handleSave}
            disabled={!tempName} // newNameが空の場合はボタンを無効化
          >
            作成
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
