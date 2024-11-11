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

interface NewFolderProps {
  children: string;
}

export default function NewFolder() {
  const [name, setName] = useState<string>(); // 表示される名前
  const [tempName, setTempName] = useState<string>(); // 入力用の一時的な名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態

  const handleSave = () => {
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
        {/* children を表示 */}
        <Button className="my-5 bg-darkBlue hover:bg-blue-900 px-6 py-6 text-2xl text-slate-100">
          新規作成 +
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[50%] w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            <Input
              value={tempName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTempName(e.target.value)
              }
              className="mt-2 text-black"
            />
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="pulldown" className="">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="pulldown">プルダウン</TabsTrigger>
            <TabsTrigger value="static">固定値</TabsTrigger>
          </TabsList>
          <TabsContent value="pulldown"></TabsContent>
          <TabsContent value="static"></TabsContent>
        </Tabs>
        <div className="mt-4 flex justify-between">
          <Button
            className="w-[30%]"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            削除
          </Button>
          <Button className="w-[30%]" onClick={handleSave}>
            変更
          </Button>
        </div>
      </DialogContent>

      {/* 削除確認ダイアログ */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認</DialogTitle>
            <DialogDescription>
              このタスクを削除しますか？この操作は元に戻せません。
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button
              className="mr-4"
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
