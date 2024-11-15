"use client";

import Image from "next/image";
import React, { useState } from "react";
import FolderClose from "~/components/svgs/folderClose";
import FolderOpen from "~/components/svgs/folderOpen";
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
import NewFolderTask from "./taskNew";
import EditFolderTask from "./taskEdit";
import axios from "axios";
import { useSession } from "next-auth/react";

interface EditFolderProps {
  item: FolderSet;
  taskApiResponse: TaskApiResponse;
  children: string;
  id: string;
  handleFolderGet: () => void;
}

type FolderSet = {
  // フォルダプリセット　中身
  folder: {
    name: string;
    itemId: string;
    tasks: {
      task: {
        name: string;
        itemId: string;
        isStatic: boolean;
        select: number;
        options: {
          name: string;
          time: number;
        }[];
      };
    }[];
  };
};

type TaskSet = {
  // タスクプリセット　中身
  task: {
    name: string;
    itemId: string;
    isStatic: boolean;
    options: {
      name: string;
      time: number;
    }[];
  };
};

type TaskApiResponse = {
  // タスクプリセットの取得
  message: string;
  taskSets: TaskSet[];
};

export default function EditFolder({
  item,
  taskApiResponse,
  children,
  id,
  handleFolderGet,
}: EditFolderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // ダイアログの開閉状態
  const [name, setName] = useState<string>(children); // 表示される名前
  const [newName, setNewName] = useState<string>(children); // 新しい名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [isOpen, setIsOpen] = useState(false); // アコーディオンの開閉状態を管理

  const { data: session, status } = useSession();

  const handleSave = async () => {
    // 名前を変更
    const folderData = {
      userId: session?.user.id,
      folderSet: {
        name: newName,
        items: item.folder.tasks.map((task) => ({
          itemId: task.task.itemId,
          select: task.task.select,
        })),
      },
    };
    if (!session?.user?.id) {
      return;
    }
    try {
      const res = await axios.put(
        `/api/presets/folder/${id}?userId=${session.user.id}`,
        folderData,
      );
      console.log(folderData);
    } catch (error) {}
    setName(newName);
    setIsDialogOpen(false);
    handleFolderGet();
  };

  const handleDelete = async () => {
    //削除
    if (!session?.user?.id) {
      return;
    }
    try {
      const response = await axios.delete(
        `/api/presets/folder/${id}?userId=${session.user.id}`,
      );
      console.log(response);
    } catch (error) {}
    setIsDeleteDialogOpen(false);
    setIsDialogOpen(false);
    handleFolderGet();
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
          <hr className="mb-1 mt-2 border-gray-500" />
          <div className="mx-auto w-[90%]">
            {item.folder.tasks.map((task) => (
              <div key={task.task.itemId}>
                <EditFolderTask
                  task={task.task}
                  id={task.task.itemId}
                  item={item}
                  handleFolderGet={handleFolderGet}
                >
                  {task.task.name}
                </EditFolderTask>
                <hr className="mb-1 mt-1 w-full border-gray-500" />
              </div>
            ))}

            <div className="flex items-center justify-around">
              <NewFolderTask
                item={item}
                taskApiResponse={taskApiResponse}
                handleGetFolder={handleFolderGet}
              />
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
