"use client";
import { useState } from "react";
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
import PlusCircle from "~/components/svgs/plusCircle";
interface NewFolderProps {
  children: string;
}

export default function NewTime() {
  const [name, setName] = useState<string>(); // 表示される名前
  const [tempName, setTempName] = useState<string>(); // 入力用の一時的な名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態
  const [time, setTime] = useState<string>("10:00"); // 初期値を設定

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value); // 入力された時刻を更新
  };

  const handleCreate = () => {
    // データベースに保存
    setName(tempName);
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    //データベースから削除
    setDialogOpen(false);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="mt-4 flex items-center justify-center">
          <PlusCircle
            color="#FF9AC6"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>新しい時間プリセットを作成</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Input
          value={tempName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTempName(e.target.value)
          }
          className="mt-2 text-black"
        />
        <div className="flex items-center justify-center">
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="w-full max-w-[200px] items-center border p-1"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            className="w-[30%] bg-darkBlue"
            onClick={handleCreate}
            disabled={!name}
          >
            作成
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
