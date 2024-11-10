"use client";
import { useEffect, useState } from "react";
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
  const [isEditing, setIsEditing] = useState(false); // 編集状態

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //エンターキーで編集をやめる
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    //名前を編集中に画面をタップすると編集をやめる
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
          setTempName(name); // ダイアログが閉じた時に tempName を元の name にリセット
        }
      }}
    >
      <DialogTrigger asChild>
        {/* children を表示 */}
        <Button className="w-full bg-violet-200 text-gray-700 hover:bg-violet-300 py-6 text-xl">
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[60%] w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? (
              <Input
                value={tempName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTempName(e.target.value)
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown} // Enter キーを押したときに編集を終了
                autoFocus
                className="mt-2 w-[90%] justify-center text-black"
              />
            ) : (
              <Button
                className="mt-2 w-[90%] bg-purple-300 text-left text-black"
                onClick={() => setIsEditing(true)}
              >
                {tempName || "名前を入力"}
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
