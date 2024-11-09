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

interface EditFolderProps {
  children: string;
}

export default function EditFolder({ children }: EditFolderProps) {
  const [name, setName] = useState<string>(children); // 表示される名前
  const [tempName, setTempName] = useState<string>(children); // 入力用の一時的な名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態

  const handleSave = () => {// データベースに保存
    setName(tempName); 
    setDialogOpen(false);
  };

  const handleDelete = async () => { //データベースから削除
    setDialogOpen(false);
    setIsDeleteDialogOpen(false)
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {/* children を表示 */}
        <Button className="mt-2 w-full bg-purple-300 text-black hover:bg-purple-200">
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl h-[50%]">
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
