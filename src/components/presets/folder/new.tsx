"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PlusCircle from "~/components/svgs/plusCircle";
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
interface NewFolderProps {
  children: string;
}

export default function NewFolder() {
  const [name, setName] = useState<string>(); // 表示される名前
  const [tempName, setTempName] = useState<string>(); // 入力用の一時的な名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態
  const { data: session, status } = useSession(); // セッション情報

  const handleCreate = async () => {
    const folderData = {
      userId: session?.user.id,
      folderSet: {
        name: tempName,
        itemIds: [
          // 中身なしだとエラーでる　回避できる？ //
        ],
      },
    };
    try {
      const res = await axios.post("/api/presets/folder/new", folderData);
      console.log(res.data);
      // データベースに保存
      setName(tempName);
      setDialogOpen(false);
    } catch (error) {}
  };

  const handleDelete = async () => {
    //データベースから削除
    setDialogOpen(false);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild className="">
        <div className="mt-4 flex items-center justify-center">
          <PlusCircle
            color="#A5EC44"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>新しいフォルダを作成</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Input
          value={tempName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTempName(e.target.value)
          }
          className="mt-2 text-black"
        />
        <div className="mt-4 flex justify-center">
          <Button
            className="w-[30%] bg-darkBlue"
            onClick={handleCreate}
            disabled={!tempName}
          >
            作成
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
