"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import EditTask from "../task/edit";
import NewTask from "../task/new";

interface EditFolderProps {
  children: string;
}

export default function EditFolder({ children }: EditFolderProps) {
  const [time, setTime] = useState<string>("10:00"); // 初期値を設定
  const [isDialogOpen, setIsDialogOpen] = useState(false); // ダイアログの開閉状態
  const [name, setName] = useState<string>(children); // 表示される名前
  const [newName, setNewName] = useState<string>(children); // 新しい名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value); // 入力された時刻を更新
  };

  const handleSave = () => {
    // 名前を変更
    setName(newName);
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    // 削除処理
    setIsDeleteDialogOpen(false);
    setIsDialogOpen(false);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex w-full items-center justify-center rounded-t-md bg-violet-200 p-2 text-xl text-gray-700 hover:bg-violet-300">
          {name}
        </AccordionTrigger>
        <AccordionContent className="items-center rounded-b-md bg-gray-200 text-xl">
          <div className="mx-auto flex w-[80%] items-center justify-center">
            <div className="mt-5">
              <div className="mt-3">
                <EditTask>駅まで徒歩</EditTask>
              </div>
              <div className="mt-3">
                <EditTask>ごはん</EditTask>
              </div>
              <div className="mt-3">
                <EditTask>着替え</EditTask>
              </div>
              <div className="mt-3">
                <EditTask>メイク</EditTask>
              </div>
              <div className="mt-3">
                <EditTask>ヘアメイク</EditTask>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <NewTask />
                <Button
                  className="rounded-full bg-gray-500 ml-2 p-2"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Image src="/image/edit.svg" alt="" width={20} height={20} className="" />
                </Button>
              </div>
            </div>
          </div>

          {/* 名前変更ダイアログ */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-[90%] rounded-xl">
              <DialogHeader>
                <DialogTitle>名前を変更</DialogTitle>
              </DialogHeader>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
                className="mt-4"
                placeholder="新しい名前を入力"
              />

              {/* 削除ボタン（名前変更ダイアログ内） */}
              <div className="flex justify-around mt-4">
                <Button
                  className="bg-red-600 bg-red-700 text-white"
                  onClick={() => setIsDeleteDialogOpen(true)} // 削除確認ダイアログを開く
                >
                  削除
                </Button>
                <Button
                  className="bg-darkBlue hover:bg-blue-900"
                  onClick={handleSave}
                  disabled={!newName} // newNameが空の場合はボタンを無効化
                >
                  保存
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* 削除確認ダイアログ */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="w-[90%] rounded-xl">
              <DialogHeader>
                <DialogTitle>確認</DialogTitle>
              </DialogHeader>
              <p className="text-center mt-4 text-gray-700">この項目を削除しますか？</p>
              <div className="mt-4 flex justify-end">
                <Button
                  className="mr-4 bg-gray-600"
                  onClick={() => setIsDeleteDialogOpen(false)} // ダイアログを閉じる
                >
                  キャンセル
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDelete} // 削除処理を実行
                >
                  削除
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
