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
import FolderClose from "~/components/svgs/folderClose";
import FolderOpen from "~/components/svgs/folderOpen";

interface EditFolderProps {
  children: string;
}

export default function EditFolder({ children }: EditFolderProps) {
  const [time, setTime] = useState<string>("10:00"); // 初期値を設定
  const [isDialogOpen, setIsDialogOpen] = useState(false); // ダイアログの開閉状態
  const [name, setName] = useState<string>(children); // 表示される名前
  const [newName, setNewName] = useState<string>(children); // 新しい名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isOpen, setIsOpen] = useState(false); // アコーディオンの開閉状態を管理

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
        <AccordionTrigger
          onClick={() => setIsOpen(!isOpen)} // 開閉をトグル
          className="w-full items-center justify-between p-1 text-xl text-black"
        >
          <div>
            {isOpen ? (
              <FolderOpen
                color="#A5EC44"
                style={{ width: "35px", height: "35px" }}
              />
            ) : (
              <FolderClose
                color="#A5EC44"
                style={{ width: "35px", height: "35px" }}
              />
            )}
          </div>
          【{name}】
        </AccordionTrigger>
        <AccordionContent className="w-full">
          <hr className="mt-2 mb-1 border-gray-500" />
          <div className="mx-auto w-[90%]">
            <EditTask>駅まで徒歩</EditTask>
            <hr className="mb-1 mt-1 w-full border-gray-500" />

            <EditTask>ごはん</EditTask>
            <hr className="mb-1 mt-1 w-full border-gray-500" />

            <EditTask>着替え</EditTask>
            <hr className="mb-1 mt-1 w-full border-gray-500" />

            <EditTask>メイク</EditTask>
            <hr className="mb-1 mt-1 w-full border-gray-500" />

            <EditTask>ヘアメイク</EditTask>
            <hr className="mb-1 mt-1 w-full border-gray-500" />

            <div className="flex items-center justify-around">
              <NewTask />
              <Button
                className="ml-2 rounded-full bg-gray-500 p-2"
                onClick={() => setIsDialogOpen(true)}
              >
                <Image src="/image/edit.svg" alt="" width={20} height={20} />
              </Button>
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
              <div className="mt-4 flex justify-around">
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
              <p className="mt-4 text-center text-gray-700">
                このフォルダを削除しますか？
              </p>
              <div className="mt-4 flex justify-end">
                <Button
                  className="mr-4 bg-gray-600"
                  onClick={() => setIsDeleteDialogOpen(false)} // ダイアログを閉じる
                >
                  キャンセル
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
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
